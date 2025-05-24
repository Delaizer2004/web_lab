const { Bouquet, BouquetFlower } = require('../models/models');

exports.getAllBouquets = async (req, res) => {
  try {
    const bouquets = await Bouquet.findAll();
    res.json(bouquets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBouquetById = async (req, res) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (!bouquet) return res.status(404).json({ message: 'Bouquet not found' });
    res.json(bouquet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createBouquet = async (req, res) => {
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
};

exports.updateBouquet = async (req, res) => {
  try {
    const { name, description, price, imageUrl } = req.body;
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (!bouquet) return res.status(404).json({ message: 'Bouquet not found' });
    await bouquet.update({ name, description, price, imageUrl });
    res.json(bouquet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteBouquet = async (req, res) => {
  try {
    const bouquet = await Bouquet.findByPk(req.params.id);
    if (!bouquet) return res.status(404).json({ message: 'Bouquet not found' });
    await bouquet.destroy();
    res.json({ message: 'Bouquet deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
