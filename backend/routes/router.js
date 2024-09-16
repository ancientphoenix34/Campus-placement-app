const express = require('express')

// create router for express
const router = new express.Router()

// import userCOntroller
const userCOntroller = require('../controllers/userController')
const placementController = require('../controllers/placementController')


// import multer
const upload = require('../multerConfig/storageConfig')
const { adminLogin, allAdminDetails } = require('../controllers/adminController')

// student section
router.post('/student/register',upload.single('user-profile'), userCOntroller.register)
router.post('/student/login', userCOntroller.login)
router.post('/student/getuser', userCOntroller.getSingleUsers)
router.get('/student/getall', userCOntroller.getUsers)
router.put('/student/update/:id',upload.single('user-profile'), userCOntroller.updateUser)

// placement section
router.post('/placement/create', placementController.create)
router.put('/placement/update/:id', placementController.updateplacements)
router.post('/placement/apply', placementController.applyPlacement)
router.post('/placement/applied', placementController.appliedPlacements)
router.delete('/placement/delete/:id', placementController.deleteplacement)
router.delete('/placement/cancel', placementController.cancelApplication)
router.get('/placement/getall', placementController.getallplacements)
router.get('/placement/get/:id', placementController.getViewPlacement)
router.post('/placement/login', placementController.loginPlacement)
router.post('/placement/profile', placementController.getplacementStaff)
router.put('/placement/updateuser/:id', upload.single('user-profile'),placementController.updatePlacementStaffDetails)
router.delete('/placement/deletestaff/:id', placementController.removePlacementStaff)
router.delete('/placement/deleteStudent/:userId', userCOntroller.deleteUser)
router.post('/placement/applied/student',placementController.appliedStudents)

// admin section
router.post('/admin/addstaff',upload.single('user-profile'), placementController.createplacementStaff)
router.get('/admin/getallstaff', placementController.getAllPlacementStaffs)
router.post('/admin/login', userCOntroller.loginCustom)
router.post('/admin/login2', adminLogin)

// for postman
router.get('/admin/alldetails',allAdminDetails) 

// for announcement 
router.post('/announcements/post',placementController.postAnnouncement)
router.get('/announcements/get',placementController.getannouncement)

// chat router
const {
    accessChat,
    fetchChats,
    createGroupChat,
    removeFromGroup,
    addToGroup,
    renameGroup,
} = require("../controllers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

router.route("/").post(protect, accessChat);
router.route("/").get(protect, fetchChats);
router.route("/group").post(protect, createGroupChat);
router.route("/rename").put(protect, renameGroup);
router.route("/groupremove").put(protect, removeFromGroup);
router.route("/groupadd").put(protect, addToGroup);

// message router
const {
    allMessages,
    sendMessage,
} = require("../controllers/messageControllers");

router.route("/:chatId").get(protect, allMessages);
router.route("/").post(protect, sendMessage);

//   user chat
const {
    registerUser,
    authUser,
    allUsers,
} = require("../controllers/userControllers");
router.route("/").get(protect, allUsers);
router.route("/").post(registerUser);
router.post("/login", authUser);

module.exports = router;