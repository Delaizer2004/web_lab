// controllers/cartController.js
const { CartItem, Flower } = require('../models/models');

exports.getCart = async (req, res) => {
    try {
        const cartItems = await CartItem.findAll({ where: { userId: req.user.userId } });
        res.json(cartItems);
    } catch (error) {
        console.error('Error fetching cart:',error);
        res.status(500).json({ error: error.message });
    }
};

exports.addToCart = async (req, res) => {
    try {
        const { flowerId, quantity } = req.body;
        const flower = await Flower.findByPk(flowerId);
        if (!flower) {
            return res.status(404).json({ message: 'Flower not found' });
        }

        const cartItem = await CartItem.create({
            userId: req.user.userId,
            name: flower.name,
            description: flower.description,
            price: flower.price,
            imageUrl: flower.imageUrl,
            quantity
        });

        res.status(201).json(cartItem);
    } catch (error) {
        console.error('Error adding item to cart:',error);
        res.status(500).json({ error: error.message });
    }
};

exports.removeFromCart = async (req, res) => {
    try {
        const { id } = req.params;
        const cartItem = await CartItem.findByPk(id);
        if (!cartItem) {
            return res.status(404).json({ message: 'Item not found in cart' });
        }

        await cartItem.destroy();
        res.json({ message: 'Item removed from cart' });
    } catch (error) {
        console.error('Error removing item from cart:',error);
        res.status(500).json({ error: error.message });
    }
};
