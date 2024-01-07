const Product = require('../models/Product');
const User = require('../models/User');

const creatProduct = async (req, res) => {
    try{
        const productInfo = {...req.body};
        const product = new Product(productInfo);
        await product.save();
        res.json({message: 'Created successful!'})
    }catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
};

const getAllProducts = async (req, res) => {
    try{
        const products = await Product.find();
        res.json(products);
    }catch (err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

const getProductsByUserId = async (req, res) => {
    let cart = null;
    try {
        const userId = req.params.id;
        const user = await User.findById(userId);
        cart = user.cart;
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ message: 'Server Error' });
    }
    try{
        const products = await Product.find();
        //需要Cart里加一个product id的字段
        const result = products.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);
            const selectedQuantity = cartItem? cartItem.quantity: 0;
            return {
                ...product,
                selected:selectedQuantity
            };
        })
        res.json(result);
    }catch (err){
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

const updateProduct = async (req, res) => {
    try{
        const updateInfo = {...req.body};
        const productId = req.params.id;
        await Product.findByIdAndUpdate(productId, updateInfo);
        res.json({messge: 'Updated successful!'})
    }catch (err) {
        console.error(err.message);
        res.status(500).json({message: 'Server Error'});
    }
}

module.exports = {
    creatProduct,
    getAllProducts,
    updateProduct
}