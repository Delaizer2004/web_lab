const { Rating } = require('../models/models');

exports.createRating = async (req, res) => {
  try {
    const { userId, flowerId, rating, review } = req.body;
    const newRating = await Rating.create({ userId, flowerId, rating, review });
    res.status(201).json(newRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllRatings = async (req, res) => {
  try {
    const ratings = await Rating.findAll();
    res.json(ratings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getRatingById = async (req, res) => {
  try {
    const rating = await Rating.findByPk(req.params.id);
    if (!rating) return res.status(404).json({ message: 'Rating not found' });
    res.json(rating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateRating = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const existingRating = await Rating.findByPk(req.params.id);
    if (!existingRating) return res.status(404).json({ message: 'Rating not found' });
    await existingRating.update({ rating, review });
    res.json(existingRating);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteRating = async (req, res) => {
  try {
    const deleted = await Rating.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: 'Rating not found' });
    res.json({ message: 'Rating deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
