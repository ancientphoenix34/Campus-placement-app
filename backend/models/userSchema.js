//import mongoose
const mongoose = require('mongoose')

// create user schema
const userSchema = mongoose.Schema({
    fname: {
        type: String,
        required: true,
        trim: true,
    },
    mname: {
        type: String,
        required: true,
        trim: true
    },
    lname: {
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
    religion: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    pswd: {
        type: String,
        required: true,
    },
    profile:{
        type:String,
        required:false
    },
    Academic: {
        course: {
            type: String,
            required: false,
        },
        yearAdmin: {
            type: String,
            required: false,
        },
        courseDuration: {
            type: String,
            required: false,
        },
        tenthboard: {
            type: String,
            required: false,
        },
        tenthpassYear: {
            type: String,
            required: false,
        },
        tenthCGPA: {
            type: String,
            required: false,
        },
        twelveBoard: {
            type: String,
            required: false,
        },
        twelvepassYear: {
            type: String,
            required: false,
        },
        twelveCGPA: {
            type: String,
            required: false,
        },
        ugBoard: {
            type: String,
            required: false,
        },
        ugpassyear: {
            type: String,
            required: false,
        },
        ugCGPA: {
            type: String,
            required: false,
        }
    },
    phn: {
        type: String,
        required: true,
    },
    phnalt: {
        type: String,
        required: false,
    },
    email: {
        type: String,
        required: true
    },
    emailalt: {
        type: String,
        required: false
    },
    fatherName: {
        type: String,
        required: true,
    },
    fatherOccpt: {
        type: String,
        required: false,
    },
    fatherphn: {
        type: String,
        required: true,
    },
    motherName: {
        type: String,
        required: true,
    },
    motherOccpt: {
        type: String,
        required: false,
    },
    motherphn: {
        type: String,
        required: true,
    },
    role:{
        type:String,
        required:true
    }
    // space for file name schema
})

// create model
const users = mongoose.model('users', userSchema)

// export model
module.exports = users