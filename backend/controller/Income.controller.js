const express =require("express");
const IncomeModel = require("../model/Income.model");
const excelJS = require("exceljs");
 
async function addIncome(req,res){
    try {
        const {name, amount, category, date, emoji} = req.body;
        
        // Basic validation
        if(!name || !category || !amount || !date){
            return res.status(400).json({message: "All fields are required!"})
        }

        // Assuming req.user.id is available from protect middleware
        const user = req.user ? req.user.id : null; 
        
        const income = await IncomeModel.create({
            name, 
            amount, 
            category, 
            date, 
            emoji,
            user
        })
        res.status(200).json({message:"Income Added Successfully", income})
    } catch (error) {
        console.error("Error adding income:", error); 
        res.status(500).json({message: "Server Error"})
    }
}

async function getIncomes(req,res){
    try {
        // Filter by user if possible
        const query = req.user ? { user: req.user.id } : {};
        const income =await IncomeModel.find(query).sort({createdAt: -1});
        res.status(200).json({message:"income is found",income})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}

async function deleteIncome(req, res) {
    try {
        const {id} = req.params;
        const income = await IncomeModel.findByIdAndDelete(id);
        if (!income) {
            return res.status(404).json({message: "Income not found"});
        }
        res.status(200).json({message: "Income deleted successfully"});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

async function downloadincome(req, res) {
  try {
    const income = await IncomeModel.find({});

    // Create a new workbook & worksheet
    const workbook = new excelJS.Workbook();
    const worksheet = workbook.addWorksheet("Income Data");

    // Define columns
    worksheet.columns = [
      { header: "Name", key: "name", width: 20 },
      { header: "Amount", key: "amount", width: 15 },
      { header: "Category", key: "category", width: 20 },
      { header: "Date", key: "date", width: 20 },
    ];

    // Add rows
    income.forEach((item) => {
      worksheet.addRow({
        name: item.name,
        amount: item.amount,
        category: item.category,
        date: item.date,
      });
    });

    // Set response headers for download
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    res.setHeader("Content-Disposition", "attachment; filename=incomes.xlsx");

    // Write workbook to response
    await workbook.xlsx.write(res);
    res.status(200).end();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error generating Excel file" });
  }
}


module.exports={addIncome, getIncomes, deleteIncome, downloadincome}
