const express = require('express');
const router = express.Router();
const {
    creatProduct,
    getAllProducts,
    updateProduct,
    getProductById
} = require('../controllers/productMethods');

router.get('/products', getAllProducts);

router.post('/products', creatProduct);

router.put('/products/:id', updateProduct);

router.get('/products/:id', getProductById);

module.exports = router;