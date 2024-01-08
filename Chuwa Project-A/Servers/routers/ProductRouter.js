const express = require('express');
const router = express.Router();
const {
    creatProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    getProductsByUserId
} = require('../controllers/productMethods');

router.get('/products', getAllProducts);

router.get('/productsByUser/:id', getProductsByUserId);

router.post('/products', creatProduct);

router.put('/products/:id', updateProduct);

router.get('/products/:id', getProductById);

module.exports = router;