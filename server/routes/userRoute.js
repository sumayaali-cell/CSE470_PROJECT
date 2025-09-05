const express = require("express");
const { registration, verifyOTP, login, verifyUser, logout, handleRate } = require("../controllers/auth");
const { getUserQuestions } = require("../controllers/postController");


const router = express.Router();

router.post('/registration',registration)
router.post('/verify-otp',verifyOTP)
router.post('/login',login)
router.get('/verify-user',verifyUser)
router.get('/log-out',logout)
router.put('/update-rate',handleRate)
router.get('/get-question/:userId',getUserQuestions)


module.exports = router;