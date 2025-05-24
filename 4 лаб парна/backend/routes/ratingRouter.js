const express = require('express');
const router = express.Router();
const { Rating } = require('../models/models');

// Створення нового рейтингу
router.post('/', async (req, res) => {
  try {
    const { userId, flowerId, rating, review } = req.body;
    const newRating = await Rating.create({ userId, flowerId, rating, review });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримання списку всіх рейтингів
router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримання конкретного рейтингу за ID
router.get('/:id', async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating)
      return res.status(404).json({ message: 'Rating not found' });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Оновлення рейтингу
router.put('/:id', async (req, res) => {
  try {
    const { rating, review } = req.body;
    const existingRating = await Rating.findByPk(req.params.id);
    if (!existingRating)
      return res.status(404).json({ message: 'Rating not found' });
    await existingRating.update({ rating, review });
    res.json(existingRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Видалення рейтингу
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Rating.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ message: 'Rating not found' });
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
