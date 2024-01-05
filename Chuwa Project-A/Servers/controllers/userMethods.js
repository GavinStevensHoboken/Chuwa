const User = require('../models/User');
const jwt = require('jsonwebtoken');

const SignUp = async (req, res) => {
    try {
        const {email, password, isVendor: vendor} = {...req.body};
        const user = new User({email, password, vendor});
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

            const userResponse = {
                email: user.email,
                vendor: user.vendor
            };

            res.json({
                token: token,
                user: userResponse
            });
        }


    } catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

const UserCart = async (req, res) => {
    try {
        const { userId, productInfo } = req.body;

        const user = await User.findById(userId);
        const cart = user.cart;
        const existingProductIndex = cart.items.findIndex(item => item.name === productInfo.name);
        
        if (existingProductIndex > -1) {
            cart.items[existingProductIndex].quantity += 1;
        } else {
            cart.items.push({ ...productInfo, quantity: 1 });
        }

        await user.save();

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const FindCart = async (req, res) => {
    try{
        const userId = req.params.id;
        const user = await User.findById(userId);
        if (user){
            res.json(user.cart);
        }else{
            res.status(404).json({ message: 'User not found' });
        }
    } catch(err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    SignUp,
    Login,
    UserCart,
    FindCart
};