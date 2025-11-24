const express =require("express");
const mongoose = require("mongoose");
const ExpenseModel =require("../model/Expense.model");
const excelJS = require("exceljs");

const createExpense=async(req,res)=>{
    try {
        console.log("=== CREATE EXPENSE START ===");
        console.log("Request body:", JSON.stringify(req.body));
        console.log("Request user:", req.user);
        
        const {amount,category,date,emoji}=req.body;
        
        console.log("Extracted fields:", { amount, category, date, emoji });
        
        if (!req.user || !req.user.id) {
            console.error("User ID missing!");
            return res.status(400).json({ message: "User ID missing from token" });
        }

        const expenseData = {
            amount,
            category,
            date,
            user: req.user.id
        };

        // Add emoji if provided
        if (emoji) expenseData.emoji = emoji;

        console.log("Creating expense with data:", JSON.stringify(expenseData));
        
        const expense=await ExpenseModel.create(expenseData);
        
        console.log("Expense created successfully:", expense._id);
        console.log("=== CREATE EXPENSE END ===");
        
        res.status(200).json({message:"expense is successfully added",expense})
    } catch (error) {
        console.error("=== CREATE EXPENSE ERROR ===");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
        if (error.errors) {
            console.error("Validation errors:", JSON.stringify(error.errors));
        }
        console.error("=== END ERROR ===");
        res.status(500).json({message:error.message})
    }
}

const getExpenses=async(req,res)=>{
    try {
        console.log("=== getExpenses Debug ===");
        console.log("Full URL:", req.originalUrl);
        console.log("Params:", req.params);
        console.log("Query:", req.query);
        console.log("req.user:", req.user);
        
        if (!req.user || !req.user.id) {
             console.error("User ID missing in request");
             return res.status(400).json({ message: "User ID missing from token" });
        }

        if (!mongoose.Types.ObjectId.isValid(req.user.id)) {
             console.error("Invalid User ID format:", req.user.id);
             return res.status(400).json({ message: "Invalid User ID format" });
        }

        const query = { user: req.user.id };
        console.log("MongoDB Query being executed:", JSON.stringify(query));
        
        // Verify ExpenseModel
        if (!ExpenseModel) {
             console.error("ExpenseModel is not defined!");
             throw new Error("ExpenseModel is not defined");
        }

        // Try a simpler query first
        console.log("About to execute ExpenseModel.find()");
        const expense = await ExpenseModel.find(query);
        console.log("Query executed successfully");
        console.log("Expenses found:", expense ? expense.length : 0);
        
        res.status(200).json({message:"expense is successfully found",expense})
    } catch (error) {
        console.error("Error in getExpenses - Full error:", error);
        console.error("Error stack:", error.stack);
        console.error("Error name:", error.name);
        res.status(500).json({message:error.message})
    }
}

const getExpense = async (req, res) => {
    try {
        console.log("WARNING: getExpense (singular) was called!");
        console.log("Requested ID:", req.params.id);
        console.log("Full URL:", req.originalUrl);
        
        // Guard against invalid IDs
        const { id } = req.params;
        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            console.error("Invalid ID provided to getExpense:", id);
            return res.status(400).json({ message: `Invalid expense ID: ${id}` });
        }
        
        const expense = await ExpenseModel.findById(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        console.error("Error in getExpense:", error);
        res.status(500).json({ message: error.message });
    }
};

const updateExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await ExpenseModel.findByIdAndUpdate(id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(expense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const deleteExpense = async (req, res) => {
    try {
        const { id } = req.params;
        const expense = await ExpenseModel.findByIdAndDelete(id);
        if (!expense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createExpense,
    getExpenses,
    getExpense,
    updateExpense,
    deleteExpense
};
