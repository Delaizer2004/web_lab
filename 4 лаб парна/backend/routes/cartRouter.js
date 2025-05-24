// routes/cartRouter.js
const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const { authenticateToken } = require('../middleware/authMiddleware');

router.get('/', authenticateToken, cartController.getCart);
router.post('/add', authenticateToken, cartController.addToCart);
router.delete('/remove/:id', authenticateToken, cartController.removeFromCart);

module.exports = router;
