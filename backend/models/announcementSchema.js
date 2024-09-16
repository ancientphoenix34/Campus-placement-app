// import mongoose
const mongoose = require('mongoose');
// applicamts schema
const announcementSchema = new mongoose.Schema({
    postNotes: {
        type: String,
        required: true
    },
    postDate: {
        type: String,
        required: true
    }
})

const  announcement = mongoose.model("announcements", announcementSchema);
module.exports= announcement;