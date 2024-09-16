const Applicants = require('../models/applicantsSchema');
const placements = require('../models/placementSchema')
const { v4: uuidv4 } = require('uuid');
const placementStaff = require('../models/placementStaffSchema');
const users = require('../models/userSchema');
const announcement = require('../models/announcementSchema');

// new placement create
exports.create = async (req, res) => {
    const
        { companyName,
            recruitmentDate,
            recruitmentDetails,
            branches,
            passingYear,
            tenthpercentage,
            secondarypercentage,
            cgpa,
            backlog = ""
        } = req.body
    try {
        if (
            !companyName,
            !recruitmentDate,
            !recruitmentDetails,
            !branches,
            !passingYear,
            !tenthpercentage,
            !secondarypercentage,
            !cgpa
            // !backlog
        ) {
            return res.status(400).json({ error: 'All fields are required' })
        } else {
            let newPlacement = await placements.create({
                placementId: uuidv4().slice(0, 7),
                companyName,
                recruitmentDate,
                recruitmentDetails,
                branches,
                passingYear,
                tenthpercentage,
                secondarypercentage,
                cgpa,
                backlog
            })
            await newPlacement.save()
            res.status(201).json("Data added successfully")
        }
    }
    catch (err) {
        res.status(400).send({ message: 'Bad Request' })
    }
}
// update placement details
exports.updateplacements = async (req, res) => {
    const id = req.params.id;
    const body = req.body;
    try {
        const found = await placements.findOne({ placementId: id });
        if (!found) {
            return res.status(404).json({ error: "Not Found" });
        }
        Object.assign(found, body).save();
        res.status(200).json(found);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// get all placement details
exports.getallplacements = async (req, res) => {
    try {
        const data = await placements.find()
            .populate('branches', 'branchName')
            .exec()
        res.status(200).json(data)
    } catch (e) {
        res.status(400).json({ error: e })
    }
}
exports.getViewPlacement = async (req, res) => {
    const id = req.params.id;
    console.log("called");
    try {
        const data = await placements.findOne({ placementId: id })
        if (!data) {
            return res.status(404).json({ error: "Not Found" })
        }
        res.status(200).json(data)
    }
    catch (e) {
        res.status(502).message("internal server error")
    }
}

// delete a particular placement  
exports.deleteplacement = async (req, res) => {
    const id = req.params.id;
    try {
        const found = await placements.findOneAndDelete({ placementId: id });
        if (!found) return res.status(400).json({ error: 'The Placement does not exist.' });
        res.status(200).json(found);
    } catch (e) {
        res.status(400).json({ error: e.message });
    }
};

// apply placement
exports.applyPlacement = async (req, res) => {
    const { placementId, studentID } = req.body;
    try {
        const appliedDetails = await Applicants.findOne({ studentID, placementId })
        if (appliedDetails) return res.status(200).json("Already Applied")
        const studentApplys = await Applicants.create({ studentID, placementId });
        res.status(201).json(studentApplys);
    } catch (err) {
        res.status(500).json({ err: "Server Error" });
    }
};

// get applied placements of a student
exports.appliedPlacements = async (req, res) => {
    const { studentID } = req.body;
    try {
        const appliedPlacements = await Applicants.find({ studentID });
        res.status(200).json(Object.values(appliedPlacements).map((v) => v.placementId));
    } catch (err) {
        console.log(err);
        res.status(500).json({ msg: "Internal Server Error" })
    }
}

// get applied placements of a placement
exports.appliedStudents = async (req, res) => {
    const { placementId } = req.body;
    let studentdetails = [];
    try {
        const appliedStudent = await Applicants.find({ placementId });
        const studentPromises = appliedStudent.map(async (a) => {
            const student = await users.findOne({ _id: a.studentID });
            return student;
        });
        studentdetails = await Promise.all(studentPromises);
        return res.status(200).json(studentdetails);
    } catch (err) {
        res.status(500).json(err);
    }
};


// cancel application for a particular placement
exports.cancelApplication = async (req, res) => {
    const { placementId, studentID } = req.body;
    try {
        console.log(studentID + ' ' + placementId);
        const applier = await Applicants.findOneAndDelete({ studentID })
        console.log(applier);
        if (!applier) throw new Error('No such Application Found');
        else res.status(200).json("Successfully Cancelled");
    } catch (e) {
        console.log(e);
        res.status(400).json({ msg: e.message });
    }

}

// create placement staff not tested
exports.createplacementStaff = async (req, res) => {
    const file = req.file.filename
    const { name, phoneNumber, email, address, department, username, password } = req.body;
    let checkUser = await placementStaff.findOne({ username });
    if (checkUser) {
        return res.status(409).send("Username Already Exists!");
    }
    const staff = new placementStaff({
        staffid: uuidv4().slice(0, 7),
        name, phoneNumber, email, address, department, username, password,
        profile: file
    });
    try {
        const savedstaff = await staff.save();
        if (!savedstaff) throw new Error("Error Saving Staff in Database");
        return res.status(201).json(savedstaff);
    } catch (e) {
        console.log(e);
        res.status(500).json(e);
    }
};

exports.loginPlacement = async (req, res) => {
    const { username, password } = req.body

    try {
        const user = await placementStaff.findOne({ username })
        if (!user) return res.status(400).json({ msg: "User does not exist" })
        if (user.password !== password) {
            return res.status(400).json({ msg: "Invalid Credentials" })
        }
        return res.status(200).json(user)
    }
    catch (e) {
        res.status(500).json(e)
    }


}

//get all Placement Staffs not tested
exports.getAllPlacementStaffs = (req, res) => {
    placementStaff.find()
        .then((data) => {
            if (!data) {
                return res.status(404).json("Data Not found")
            } else {
                res.status(200).json(data);
            }
        })
        .catch((err) => {
            res.status(500).json(err);
        })
}
// get a placement staff 
exports.getplacementStaff = async (req, res) => {
    console.log(req.body);
    const { userId } = req.body
    try {
        const userDetails = await placementStaff.findOne({ _id: userId })
        if (!userDetails) res.status(404).json("Data Not Found")
        return res.status(201).json(userDetails)

    }
    catch (e) {
        return res.status(501).json(e)
    }

}
exports.updatePlacementStaffDetails = async (req, res) => {
    const id = req.params.id;
    const file = req.file;
    const updateField = req.body;
    if (!Object.keys(updateField).length) {
        return res.status(400).json('No Update Field Sent');
    } else {
        if (file && file !== "") {
            updateField.profile = file;
        }
        placementStaff.findOneAndUpdate({ _id: id }, { $set: updateField }, { new: true })
            .then((resp) => {
                console.log(resp);
                return res.status(200).json(`The data has been updated`);
            }).catch((error) => {
                return res.status(400).json(`Updation Failed ${error}`);
            });
    }
};

//delete a particular staff record not tested
exports.removePlacementStaff = async (req, res) => {
    let id = req.params.id;
    try {
        let removeData = await placementStaff.findOne({ staffid: id });
        if (!removeData) {
            return res.status(404).send("Data not Found");
        } else {
            await placementStaff.deleteOne({ staffid: id });
            return res.status(200).send("Data Deleted Successfully");
        }

    } catch (e) {
        console.log(e);
        res.status(500).send(e);
    }

}

exports.postAnnouncement = async (req, res) => {
    const { postNotes, postDate } = req.body
    try {
        if (!postNotes || !postDate) return res.status(404).json("Invalid Request")
        const postDetails = await announcement.create({ postNotes, postDate })
        if (postDetails) {
            return res.status(201).json(postDetails)
        } else {
            return res.status(400).json('Failed to Post')
        }
    }
    catch (e) {
        res.status(500).send(e);
    }
}
exports.getannouncement = async (req, res) => {
    try {
        const announcementDetails = await announcement.find()
        if (!announcementDetails) return res.status(404).json("Data Not Found")
        return res.status(200).json(announcementDetails)
    }
    catch (e) {
        res.status(500).send(e);
    }
}