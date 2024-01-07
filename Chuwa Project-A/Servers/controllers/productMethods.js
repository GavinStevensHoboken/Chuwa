const Product = require('../models/Product');

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
const getProductById = async (req, res) => {
    try {
        const productId = req.params.id;
        const product = await Product.findById(productId);
        res.json(product);
    } catch (error) {
        if (error.name === 'CastError') {
            return res.status(400).json({ message: "Invalid product ID" });
        }
        res.status(500).send(error.message);
    }
};

module.exports = {
    creatProduct,
    getAllProducts,
    updateProduct,
    getProductById
}