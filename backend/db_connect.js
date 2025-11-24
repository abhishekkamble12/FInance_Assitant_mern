const mongoose = require("mongoose");

const connectdb = async () => {
    try {
        console.log("Attempting to connect to MongoDB...");
        await mongoose.connect(process.env.mongo_url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1);
    }
};

module.exports = connectdb;