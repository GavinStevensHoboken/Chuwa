const express = require('express');
const router = express.Router();
const Login = require('../controllers/login');
const SignUp = require('../controllers/sign up');

router.post('/api/login', Login);

router.post('/api/signup', SignUp)

module.exports = router;