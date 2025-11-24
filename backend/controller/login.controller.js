const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usermodel = require("../model/user.model");
const jwtstring = process.env.JWT_SECRET;
if (!jwtstring) {
  console.error("JWT_SECRET is not defined in environment variables");
}

async function Userregister(req, res) {
  try {
    // Debug logging
    console.log("=== Registration Request Debug ===");
    console.log("Request body:", req.body);
    console.log("Request file:", req.file);
    
    // Safely parse form-data fields
    const name = req.body?.name;
    const email = req.body?.email;
    const password = req.body?.password;

    if (!name || !email || !password) {
      console.log("Missing fields - name:", name, "email:", email, "password:", password);
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user exists
    const userexist = await usermodel.findOne({ email });
    if (userexist) {
      console.log("User already exists:", email);
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password
    const hashedpassword = await bcrypt.hash(password, 10);

    // Access uploaded file
    const profileImage = req.file ? req.file.filename : null;

    // Create user
    const user = await usermodel.create({
      name,
      email,
      password: hashedpassword,
      image: profileImage,
    });

    console.log("User created successfully:", user._id);

    // Generate JWT
    const token = jwt.sign({ id: user._id }, jwtstring, { expiresIn: "1h" });

    return res.status(200).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        image: profileImage,
      },
    });

  } catch (error) {
    console.error("=== Registration Error ===");
    console.error("Error message:", error.message);
    console.error("Error stack:", error.stack);
    return res.status(500).json({ message: error.message });
  }
}

async function userlogin(req, res) {
  try {
    const { email, password } = req.body;

    const userexist = await usermodel.findOne({ email });
    if (!userexist) {
      return res.status(400).json({ message: "User not found" });
    }

    const ispasswordmatch = await bcrypt.compare(password, userexist.password);
    if (!ispasswordmatch) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ id: userexist._id }, jwtstring, { expiresIn: "1h" });

    return res.status(200).json({
      message: "User login successful",
      token,
      user: {
        id: userexist._id,
        name: userexist.name,
        email: userexist.email,
        image: userexist.image,
      },
    });

  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ message: error.message });
  }
}

module.exports = { Userregister, userlogin };
