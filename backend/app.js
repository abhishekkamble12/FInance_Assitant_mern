const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const authRoute = require("./routes/authRoute");
const incomeRoute = require("./routes/Income.routes");
const expenseRoute = require("./routes/expense.routes");
const dashboardRoute = require("./routes/Dashboard.routes");

const app = express();

// CORS must come before routes
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));
app.use(cookieParser());

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Debug middleware to log all requests
app.use((req, res, next) => {
    console.log(`[APP] ${req.method} ${req.originalUrl}`);
    next();
});

// Auth route uses multer, so NO express.json() for it
app.use("/api/v1", authRoute);

// Other routes need JSON parsing
// IMPORTANT: Order matters! Specific routes should come before parameterized routes
app.use("/api/v1", express.json(), expenseRoute);
app.use("/api/v1", express.json(), incomeRoute);
app.use("/api/v1", express.json(), dashboardRoute);

module.exports = app;