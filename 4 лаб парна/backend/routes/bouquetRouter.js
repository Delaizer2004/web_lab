const express = require('express');
const router = express.Router();
const { Bouquet, BouquetFlower } = require('../models/models');

// Отримання списку всіх букетів
router.get('/', async (req, res) => {
  try {
    const bouquets = await Bouquet.findAll();
    res.json(bouquets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримання конкретного букета за ID
router.get('/:id', async (req, res) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (!bouquet)
      return res.status(404).json({ message: 'Bouquet not found' });
    res.json(bouquet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Створення нового букета із можливістю додавання квітів
router.post('/', async (req, res) => {
  try {
    const { name, description, price, imageUrl, flowers } = req.body;
    const bouquet = await Bouquet.create({ name, description, price, imageUrl });
    if (Array.isArray(flowers)) {
      for (const item of flowers) {
        // item має містити { flowerId, quantity }
        await BouquetFlower.create({
          bouquetId: bouquet.id,
          flowerId: item.flowerId,
          quantity: item.quantity,
        });
      }
    }
    res.status(201).json(bouquet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Оновлення даних букета (без оновлення складу квітів)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (!bouquet)
      return res.status(404).json({ message: 'Bouquet not found' });
    await bouquet.update({ name, description, price, imageUrl });
    res.json(bouquet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Видалення букета
router.delete('/:id', async (req, res) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (!bouquet)
      return res.status(404).json({ message: 'Bouquet not found' });
    await bouquet.destroy();
    res.json({ message: 'Bouquet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
