const express = require('express');
const router = express.Router();
const {
    creatProduct,
    getAllProducts,
    updateProduct
} = require('../controllers/productMethods');

router.get('/products', getAllProducts);

router.post('/products', creatProduct);

router.put('/products/:id', updateProduct);

module.exports = router;