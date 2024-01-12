const User = require('../models/User');
const Product = require('../models/Product');
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
                    id: user._id,
                    vendor: user.vendor,
                    email: user.email
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
        const product = await Product.findById(productInfo.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // check if there are products left
        if (product.quantity <= 0) {
            return res.status(400).json({ message: 'Product is out of stock' }); 
        }

        const user = await User.findById(userId);
        const cart = user.cart;
        const existingProductIndex = cart.items.findIndex(item => item.productId === productInfo.productId);

        product.quantity = Math.max(product.quantity - 1, 0);
        
        if (existingProductIndex > -1) {
            cart.items[existingProductIndex].quantity += 1;
        } else {
            cart.items.push({ ...productInfo, quantity: 1 });
        }

        await user.save();
        await product.save();

        res.json({ message: 'Product added to cart', cart: user.cart });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
}

const decrementCart = async (req, res) => {
    try {
        const { userId, productInfo } = req.body;
        const product = await Product.findById(productInfo.productId);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        const user = await User.findById(userId);
        const cart = user.cart;
        const existingProductIndex = cart.items.findIndex(item => item.productId === productInfo.productId);
        
        if(productInfo.quantity === 0) {
            //这个是Edit删除产品时加的，如果传入的quantity为0，购物车就删它
            cart.items.splice(existingProductIndex, 1);
        }else if (existingProductIndex > -1) {
                // Decrement
                cart.items[existingProductIndex].quantity -= 1;
        
                // remove if there is none left
                if (cart.items[existingProductIndex].quantity === 0) {
                    cart.items.splice(existingProductIndex, 1);
                }
        }

        product.quantity += 1;
    
        await user.save();
        await product.save();
        
        res.json({ message: 'Product quantity decremented', cart: user.cart });
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
            for (let i = user.cart.items.length - 1; i >= 0; i--) {
                const item = user.cart.items[i];
                const product = await Product.findById(item.productId);

                if (!product) {
                    user.cart.items.splice(i, 1);
                }
            }
            await user.save();
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
    FindCart,
    decrementCart
};