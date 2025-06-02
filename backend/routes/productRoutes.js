const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/products', productController.addProduct);
router.put('/products/:id', productController.updateProduct);
router.get('/productList', productController.getAllProducts);

module.exports = router;
