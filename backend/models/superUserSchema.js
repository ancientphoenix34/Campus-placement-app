//import mongoose
const mongoose = require('mongoose')

// create user schema
const superUsersSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    dob: {
        type: String,
        required: true,
    },
    pswd:{
        type:String,
        required:true
    },
    role:{
        type:String,
        required:true
    }
    // space for file name schema
})

// create model
const superUsers = mongoose.model('superUsers', superUsersSchema)

// export model
module.exports = superUsers