const User = require('../models/User');

const SignUp = async (req, res) => {
    try{
        const { email, password } = {...req.body};
        const user = new User({email, password});
        await user.save();
        res.json({message: 'success'})
        
    }catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = SignUp;