const express = require('express');
const { loginUser,signUpUser,studentList } = require('../controller/userController');
const router = express.Router();
//login route
router.post("/login", loginUser);
//signup route
router.post("/signup", signUpUser);
router.get('/students',studentList)
module.exports = router;