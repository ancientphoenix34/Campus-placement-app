// import mongoose
const mongoose = require('mongoose')

//  placement schema
const placementSchema = mongoose.Schema({
    placementId:{
        type:String,
        required:true,
    },
    companyName: {
        type: String,
        required: true,
    },
    recruitmentDate: {
        type: String,
        required: true,
    },
    recruitmentDetails: {
        type: String,
        required: true,
    },
    branches: {
        type: String,
        required: true,
    },
    passingYear: {
        type: String,
        required: true,
    },
    tenthpercentage: {
        type: String,
        required: true,
    },
    secondarypercentage: {
        type: String,
        required: true,
    },
    cgpa: {
        type: String,
        required: true,
    },
    backlog: {
        type: String,
        required: false,
    },
    appliedDetails:{
        type:Array,
        required:true
    }
})

// create model
const placements = mongoose.model('placements', placementSchema)

// export model
module.exports = placements