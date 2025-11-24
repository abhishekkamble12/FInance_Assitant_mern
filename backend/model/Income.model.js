const mongoose =require("mongoose");

const Incomeschema =mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"usermodel"
    },
    name:{
        type:String,
        required:true,
        trim: true
    },
    amount:{
        type:Number,
        required:true,
        maxLength: 20,
        trim: true
    },
    type: {
        type: String,
        default: "income"
    },
    category:{
        type:String,
        required:true,
        trim: true
    },
    date:{
        type:Date,
        required:true,
        trim: true
    },
    emoji: {
        type: String,
        default: '💰'
    }
}, {timestamps: true})

const IncomeModel =mongoose.model("IncomeModel",Incomeschema)
module.exports =IncomeModel