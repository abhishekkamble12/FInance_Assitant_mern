const express= require("express");
const mongoose =require("mongoose");
const userschema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:false,
    }
})


// module.exports
const usermodel =mongoose.model("usermodel",userschema)
module.exports =usermodel
