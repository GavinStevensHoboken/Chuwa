const express = require('express');
const router = express.Router();
const {
    creatProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductsByUserId
} = require('../controllers/productMethods');

router.get('/products', getAllProducts);

router.get('/productsByUser/:id', getProductsByUserId);

router.post('/products', creatProduct);

router.put('/products/:id', updateProduct);

router.delete('/products/:id', deleteProduct);

router.get('/products/:id', getProductById);

module.exports = router;