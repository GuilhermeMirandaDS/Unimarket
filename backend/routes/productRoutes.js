const express = require('express');
const router = express.Router();
const { addProduct, updateProduct, getAllProducts } = require('../controllers/productController');
const { getProductList } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/products', addProduct);
router.put('/products/:id', updateProduct);
router.get('/products', getAllProducts);
router.get('/productList', authMiddleware, getProductList)

module.exports = router;
