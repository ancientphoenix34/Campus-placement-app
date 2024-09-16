// import mongoose
const mongoose = require('mongoose');
// applicamts schema
const ApplicantSchema = new mongoose.Schema({
    studentID: {
        type: String,
        required: true
    },
    placementId: {
        type: String,
        required: true
    }
})

const  Applicants = mongoose.model("Applicants", ApplicantSchema);
module.exports= Applicants;