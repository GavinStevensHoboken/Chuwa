const express = require('express');
const router = express.Router();
const {SignUp, Login, UserCart, FindCart, decrementCart} = require('../controllers/userMethods');
const authenticateJWT = require('../middleWares/authentication');


router.get('/auth', authenticateJWT, (req, res) => {
    if (req.isAuthenticated) {
        res.json(req.user);
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
});


router.post('/api/login', Login);

router.post('/api/signup', SignUp);

router.post('/api/Cart', UserCart);

router.get('/api/Cart/:id', FindCart);

router.put('/api/Cart', decrementCart)

module.exports = router;