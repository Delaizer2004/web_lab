const express = require('express');
const router = express.Router();

const userRouter = require('./userRouter');
const flowerRouter = require('./flowerRouter');
const bouquetRouter = require('./bouquetRouter');
const ratingRouter = require('./ratingRouter');
const basketRouter = require('./basketRouter');
const orderRouter = require('./orderRouter');

router.use('/users', userRouter);
router.use('/flowers', flowerRouter);
router.use('/bouquets', bouquetRouter);
router.use('/ratings', ratingRouter);
router.use('/basket', basketRouter);
router.use('/orders', orderRouter);

module.exports = router;
