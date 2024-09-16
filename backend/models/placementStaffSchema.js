const mongoose = require('mongoose')

const  { Schema, model } = mongoose;

const placementStaffSchema = new Schema({
    staffid:{
        type: String,
        required:true
    },
    name:{
        type :String,
        required:true,
    },
    phoneNumber:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    profile:{
        type:String,
        required:false
    },
})

const PlacementStaff = model("PlacementStaffs",placementStaffSchema);
module.exports= PlacementStaff;