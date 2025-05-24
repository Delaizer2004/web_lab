const express = require('express');
const router = express.Router();
const { Order, OrderItem } = require('../models/models');

// Створення нового замовлення
router.post('/', async (req, res) => {
  try {
    const { userId, totalPrice, items, deliveryAddress } = req.body;
    const order = await Order.create({
      userId,
      totalPrice,
      status: 'pending',
      // Якщо модель Order має поле для адреси доставки, розкоментуйте наступне:
      // deliveryAddress: deliveryAddress,
    });

    // Додавання елементів замовлення
    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        flowerId: item.flowerId || null,
        bouquetId: item.bouquetId || null,
        quantity: item.quantity,
        price: item.price,
      });
    }
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримання замовлень користувача (історія замовлень)
router.get('/:userId', async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { userId: req.params.userId },
      include: [OrderItem],
    });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Отримання деталей конкретного замовлення за ID
router.get('/single/:orderId', async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.orderId, { include: [OrderItem] });
    if (!order)
      return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Оновлення статусу замовлення (для адміністратора)
router.put('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findByPk(req.params.orderId);
    if (!order)
      return res.status(404).json({ message: 'Order not found' });
    await order.update({ status });
    res.json(order);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Видалення замовлення
router.delete('/:orderId', async (req, res) => {
  try {
    const deleted = await Order.destroy({ where: { id: req.params.orderId } });
    if (!deleted)
      return res.status(404).json({ message: 'Order not found' });
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
