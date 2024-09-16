//import mongoose
const mongoose=require('mongoose')
const { trim } = require('validator')

//create admin schema
const adminSchema=mongoose.Schema({
    adminUsername:{
        type:String,
        required:true,
    },
    adminPassword:{
        type:String,
        required:true,
    }
})

const admin=mongoose.model('admin',adminSchema)

module.exports=admin

