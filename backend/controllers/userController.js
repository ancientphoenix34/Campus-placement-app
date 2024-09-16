const users = require('../models/userSchema')
const superUsers = require('../models/superUserSchema')
const generateToken = require('../db/generateToken')
exports.register = async (req, res) => {
    // get image details
    // const file = req.file.filename
    // get other usre input from  request
    const { fname, mname, lname, username, gender, dob, religion, address, pswd = "", email, phn, phnalt = "", emailalt = "", fatherOccpt = "", motherOccpt = "", fatherName, fatherphn, motherName, motherphn, Academic, } = req.body
    if (!fname || !mname || !lname || !username || !gender || !dob || !religion || !address || !phn || !fatherName || !fatherphn || !motherName || !motherphn) {
        return res.status(404).json('All fields are required')
    }
    else {
        try {
            // check already username is already registered
            const preuser = await users.findOne({ username })
            if (preuser) {
                return res.status(401).json('User already Exists')
            }
            else {
                const newUser = new users({ fname, mname, lname, username, gender, dob, religion, pswd, address, email, phn, fatherName, fatherphn, motherName, motherphn, Academic, phnalt, emailalt, fatherOccpt, motherOccpt, role: "student" })
                await newUser.save()
                return res.status(201).json(newUser)
            }
        }
        catch (err) {
            return res.status(200).json(err)
        }
    }
}

exports.createStudent = async (req, res) => {
    // get image details
    // const file = req.file.filename
    // get other usre input from  request
    const { fname, mname, lname, username, gender, dob, religion, address, pswd, email, phn, phnalt = "", emailalt = "", fatherOccpt = "", motherOccpt = "", fatherName, fatherphn, motherName, motherphn, Academic, role = "student" } = req.body
    if (!fname || !mname || !lname || !username || !gender || !dob || !religion || !address || !pswd || !phn || !fatherName || !fatherphn || !motherName || !motherphn) {
        return res.status(404).json('All fields are required')
    }
    else {
        try {
            // check already username is already registered
            const preuser = await users.findOne({ username })
            if (preuser) {
                return res.status(401).json('User already Exists')
            }
            else {

                const newUser = new users({ fname, mname, lname, username, gender, dob, religion, address, pswd, email, phn, fatherName, fatherphn, motherName, motherphn, Academic, phnalt, emailalt, fatherOccpt, motherOccpt, role })
                await newUser.save()
                return res.status(201).json(newUser)
            }
        }
        catch (err) {
            return res.status(200).json(err)
        }
    }
}

exports.login = async (req, res) => {
    const { username, pswd, role = "student" } = req.body;
    try {
        const userDetails = await users.findOne({ username })
        if (!userDetails) return res.status(404).json("No User Found")
        if (userDetails.pswd === pswd && userDetails.role === role) {
            return res.status(201).json(userDetails)
        }
        return res.status(404).json("Invalid Password")
    }
    catch (err) {
        res.status(501).json(err)
    }
}

exports.loginCustom = async (req, res) => {
    const { username, pswd, role } = req.body;
    try {
        const userDetails = await superUsers.findOne({ username })
        if (!userDetails) return res.status(404).json("No User Found")
        if (userDetails.pswd === pswd && userDetails.role === role) {
            return res.status(201).json({ ...userDetails, token: generateToken(userDetails._id), })
        }
        return res.status(404).json("Invalid Password")
    }
    catch (err) {
        res.status(501).json(err)
    }
}

// get all user details
exports.getUsers = async (req, res) => {
    const userData = await users.find();
    if (!userData) return res.json(404).send("No Data found");
    res.status(200).send(userData);
}

exports.getSingleUsers = async (req, res) => {
    const { id } = req.body
    console.log(req.body);
    try {
        const userData = await users.findOne({ _id: id });
        if (!userData) return res.json(404).send("No Data found");
        res.status(200).send(userData);
    }
    catch (e) {
        res.status(404).json({ message: "internal server error" })
    }
}

// update the user data  
exports.updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const file = req?.file?.filename || "";
        const userDetails = await users.findOne({ username: id });
        if (!userDetails) {
            return res.status(404).json("Data not Found");
        }
        const updateFields = { ...req.body };
        const transformedUpdateFields = {};
        for (const key in updateFields) {
            if (Object.prototype.hasOwnProperty.call(updateFields, key)) {
                const transformedKey = key.replace(/\[|\]/g, '');
                transformedUpdateFields[transformedKey] = updateFields[key];
            }
        }
        const transformedData = {};
        for (const key in transformedUpdateFields) {
            if (Object.prototype.hasOwnProperty.call(transformedUpdateFields, key)) {
                const transformedKey = key.split(/Academic/gm).join('Academic.');
                transformedData[transformedKey] = transformedUpdateFields[key];
            }
        }
        if (file && file !== "") {
            updateFields.profile = file;
        }
        delete transformedData['user-profile'];
        const updatedUser = await users.findOneAndUpdate({ username: id }, { $set: transformedData }, { new: true });
        if (!updatedUser) {
            return res.status(404).json("Details not Updated");
        }
        return res.status(200).json(updatedUser);
    } catch (e) {
        console.error("Error updating user details:", e);
        return res.status(500).json("Internal Server Error");
    }


};

// delete a particular user from database
exports.deleteUser = async (req, res) => {
    const userId = req.params.userId;
    try {
        const deletedUser = await users.findOneAndDelete({ username: userId })
        if (!deletedUser) return res.status(404).json("No User Found")
        res.status(200).json(`User with ID ${deletedUser._id} has been Deleted`)
    } catch (error) {
        res.status(500).json(error)
    }
}