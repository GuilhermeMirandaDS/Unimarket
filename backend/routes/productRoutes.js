const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, getAllProducts } = require('../controllers/productController');

router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.get('/products', getAllProducts);

module.exports = router;
