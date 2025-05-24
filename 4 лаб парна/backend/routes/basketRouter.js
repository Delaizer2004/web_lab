// routes/basketRouter.js
const express = require('express');
const router = express.Router();
const basketController = require('../controllers/basketController');

// Отримання кошика користувача за userId
router.get('/:userId', basketController.getBasket);

// Додавання квітки до кошика (створення нового запису)
router.post('/:userId/flowers', basketController.addFlowerToBasket);

// Оновлення кількості квітки в кошику
router.put('/:userId/flowers/:flowerId', basketController.updateBasketFlower);

// Видалення квітки з кошика
router.delete('/:userId/flowers/:flowerId', basketController.removeFlowerFromBasket);

module.exports = router;
