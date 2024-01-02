const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token,
            process.env.JWT_SECRET, (err, user) => {
                if (err) {
                    console.error(err);
                    req.isAuthenticated = false;
                } else {
                    req.user = user;
                    req.isAuthenticated = true;
                }
                next();
            });
    } else {
        req.isAuthenticated = false;
        next();
    }
};

module.exports = authenticateJWT;
