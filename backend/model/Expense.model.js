const mongoose =require("mongoose");
const ExpenseSchema =new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel"
        },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    date:{
        type:Date,
        required:true
    },
    emoji:{
        type:String,
        default:'🍕'
    }
},{timestamps:true})

module.exports=mongoose.model("expense",ExpenseSchema)