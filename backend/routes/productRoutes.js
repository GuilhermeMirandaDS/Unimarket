const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.get('/products/:id', productController.getProductById);
router.get('/productList', productController.getAllProducts);

module.exports = router;
