const express = require('express');
const router = express.Router();
const {SignUp, Login} = require('../controllers/userMethods');

router.post('/api/login', Login);

router.post('/api/signup', SignUp)

module.exports = router;