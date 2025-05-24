const { Flower, Rating } = require('../models/models');
const { Op } = require('sequelize');

exports.getAllFlowers = async (req, res) => {
  try {
      const { name, priceMin, priceMax } = req.query;
      const where = {};

      if (name) {
          where.name = { [Op.iLike]: `%${name}%` };
      }
      if (priceMin) {
          where.price = { [Op.gte]: parseFloat(priceMin) };
      }
      if (priceMax) {
          where.price = { [Op.lte]: parseFloat(priceMax) };
      }

      const flowers = await Flower.findAll({ where });
      res.json(flowers);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getFlowerById = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });
    res.json(flower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createFlower = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;
    const flower = await Flower.create({ name, description, price, stock, imageUrl });
    res.status(201).json(flower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateFlower = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : req.body.imageUrl;
    const flower = await Flower.findByPk(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });
    await flower.update({ name, description, price, stock, imageUrl });
    res.json(flower);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteFlower = async (req, res) => {
  try {
    const flower = await Flower.findByPk(req.params.id);
    if (!flower) return res.status(404).json({ message: 'Flower not found' });
    await flower.destroy();
    res.json({ message: 'Flower deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFlowerRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll({ where: { flowerId: req.params.id } });
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
