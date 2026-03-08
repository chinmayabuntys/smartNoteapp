const express = require('express');
const router = express.Router();


const { handleSignup, handleLogin, handlegetDetails } = require('../controllers/authController.js');
const auth = require('../Auth/auth.js');


// Register a new user
router.post('/signup',handleSignup);
router.post('/login',handleLogin);
router.get('/getalldetails',auth,handlegetDetails)
module.exports = router;
