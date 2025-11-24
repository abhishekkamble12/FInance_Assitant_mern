const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    console.log("=== Auth Check ===");
    console.log("Headers:", req.headers.authorization ? "Present" : "Missing");
    
    // Check if authorization header exists
    if (!req.headers.authorization) {
        console.log("Auth Check Failed: No authorization header");
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    
    // Check if authorization header has Bearer format
    const parts = req.headers.authorization.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        console.log("Auth Check Failed: Invalid authorization header format");
        return res.status(401).json({ message: "Unauthorized - Invalid token format" });
    }
    
    const token = parts[1];
    if (!token) {
        console.log("Auth Check Failed: Missing token");
        return res.status(401).json({ message: "Unauthorized - No token provided" });
    }
    
    if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is not defined!");
        return res.status(500).json({ message: "Server configuration error" });
    }
    
    console.log("Token received, verifying...");
    
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.log("Auth Check Failed: Token verification failed", err.message);
            return res.status(401).json({ message: "Unauthorized - Invalid token" });
        }
        console.log("Auth Check Passed for user:", user.id);
        req.user = user;
        next();
    });
};

module.exports = protect;