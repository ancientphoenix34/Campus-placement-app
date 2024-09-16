const admin = require('../models/adminSchema')

exports.adminLogin = async (req, res) => {
    const { username, password } = req.body;
    try {
        console.log(username, password);
        const adminDetails = await admin.findOne({ adminUsername: username })
        if (!adminDetails) return res.status(404).json("no such admin is present")
        if (adminDetails.adminPassword == password && adminDetails.adminUsername == username) {
            return res.status(201).json(adminDetails)
        }
        return res.status(404).json("invalid password")
    }
    catch (err) {
        res.status(501).json(err)
    }
}

exports.allAdminDetails = async (req, res) => {
    try {
        const adminDetails = await admin.find()
        if (!adminDetails) return res.status(404).json("NO data Found")
        return res.status(200).json(adminDetails)
    }
    catch (e) {
        return res.status(501).json("Internal server error")
    }
}