const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { getUser } = require('../controllers/authController');
const { getProductList } = require('../controllers/productController');
const authMiddleware = require('../middlewares/authMiddleware');

router.post('/register', register);
router.post('/login', login);
router.get('/me', authMiddleware, getUser);
router.get('/productList', authMiddleware, getProductList)

module.exports = router;
