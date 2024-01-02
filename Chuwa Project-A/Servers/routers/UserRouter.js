const express = require('express');
const router = express.Router();
const {SignUp, Login} = require('../controllers/userMethods');
const authenticateJWT = require('../middleWares/authentication');


router.get('/login', authenticateJWT, (req, res) => {
    if (req.isAuthenticated) {
        res.json({authenticated: true});
    } else {
        res.json({authenticated: false});
    }
});


router.post('/api/login', Login);

router.post('/api/signup', SignUp)

module.exports = router;