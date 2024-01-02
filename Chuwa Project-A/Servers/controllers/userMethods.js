const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SignUp = async (req, res) => {
    try {
        const {email, password} = {...req.body};
        const user = new User({email, password});
        await user.save();
        res.json({message: 'success'})

    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

const Login = async (req, res) => {
    try {
        const {email, password} = {...req.body};
        const user = await User.findOne({email: email})
        if (!user || user.password !== password) {
            res.status(401).json({message: 'Invalid Credentials'})
        } else {
            const payload = {
                user: {
                    id: user._id
                }
            };

            const token = await jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '30d'
            });
            res.json({token: token})
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    SignUp,
    Login
};