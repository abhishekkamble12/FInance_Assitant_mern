const express = require("express");
const dotenv = require("dotenv");
const connectdb = require("./db_connect");

dotenv.config();

const app = require("./app");

const startServer = async () => {
    try {
        await connectdb();
        app.listen(3000, () => {
            console.log("server is runing on the port 3000");
        });
    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();