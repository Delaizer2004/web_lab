const express = require('express');
const router = express.Router();
const flowerController = require('../controllers/flowerController');
const upload = require('../middleware/upload');

// Отримання списку всіх квітів
router.get('/', flowerController.getAllFlowers);

// Отримання конкретної квітки за ID
router.get('/:id', flowerController.getFlowerById);

// Створення нової квітки
router.post('/', upload.single('image'), flowerController.createFlower);

// Оновлення даних квітки
router.put('/:id', upload.single('image'), flowerController.updateFlower);

// Видалення квітки
router.delete('/:id', flowerController.deleteFlower);

// Отримання рейтингів для конкретної квітки
router.get('/:id/ratings', flowerController.getFlowerRatings);

module.exports = router;
