const jwt = require('jsonwebtoken');
require('dotenv').config;

module.exports = async (req, res, next) => {
    const token = req.header('x-auth-token') || req.headers?.authorization?.match(/^Bearer (.+)/)[1];

    if (!token) {
        return res.redirect('/login');
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (err) {
        console.error(err.message);
        res.redirect('/login');
    }
}