// controllers/basketController.js
const { Basket, BasketFlower, Flower } = require('../models/models');

exports.getBasket = async (req, res) => {
    try {
        const basket = await Basket.findOne({
            where: { userId: req.params.userId },
            include: {
                model: BasketFlower,
                include: [Flower]
            }
        });
        if (!basket) return res.status(404).json({ message: 'Basket not found' });
        console.log('Basket data:', JSON.stringify(basket, null, 2)); // Додано логування
        res.json(basket);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};



exports.addFlowerToBasket = async (req, res) => {
    try {
        const { flowerId, quantity } = req.body;
        let basket = await Basket.findOne({ where: { userId: req.params.userId } });
        if (!basket) {
            basket = await Basket.create({ userId: req.params.userId });
        }
        const basketFlower = await BasketFlower.create({
            basketId: basket.id,
            flowerId,
            quantity,
        });
        res.status(201).json(basketFlower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateBasketFlower = async (req, res) => {
    try {
        const { quantity } = req.body;
        const basket = await Basket.findOne({ where: { userId: req.params.userId } });
        if (!basket) return res.status(404).json({ message: 'Basket not found' });
        const basketFlower = await BasketFlower.findOne({
            where: { basketId: basket.id, flowerId: req.params.flowerId },
        });
        if (!basketFlower) return res.status(404).json({ message: 'Item not found in basket' });
        await basketFlower.update({ quantity });
        res.json(basketFlower);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.removeFlowerFromBasket = async (req, res) => {
    try {
        const basket = await Basket.findOne({ where: { userId: req.params.userId } });
        if (!basket) return res.status(404).json({ message: 'Basket not found' });
        const deleted = await BasketFlower.destroy({
            where: { basketId: basket.id, flowerId: req.params.flowerId },
        });
        if (!deleted) return res.status(404).json({ message: 'Item not found in basket' });
        res.json({ message: 'Item removed from basket' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
