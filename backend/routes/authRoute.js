const express = require("express");
const router = express.Router();
const { Userregister, userlogin } = require("../controller/login.controller");
const upload = require("../middleware/upload");

// Test endpoint to verify multer is working
router.post("/test-upload", upload.single("profileImage"), (req, res) => {
  console.log("=== TEST UPLOAD ===");
  console.log("Body:", req.body);
  console.log("File:", req.file);
  res.json({ body: req.body, file: req.file ? req.file.filename : null });
});

router.post("/register", upload.single("profileImage"), Userregister);
router.post("/login", express.json(), userlogin);

module.exports = router;
