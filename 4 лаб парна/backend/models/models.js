const sequelize = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// Модель користувача
const User = sequelize.define('user', {
  //id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
  //role: { type: DataTypes.STRING, defaultValue: "USER" },
});

// Модель квітки
const Flower = sequelize.define('flower', {
  //id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  imageUrl: { type: DataTypes.STRING, allowNull: true },
});

// Модель букета
const Bouquet = sequelize.define('bouquet', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.TEXT },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  imageUrl: { type: DataTypes.STRING },
});

const BouquetFlower = sequelize.define('bouquetFlower', {
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
}, { timestamps: false });

// Модель рейтингу (відгуків) для квітів 
const Rating = sequelize.define('rating', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  rating: { type: DataTypes.SMALLINT, allowNull: false },
  review: { type: DataTypes.TEXT },
}, { timestamps: true });

// Модель кошика (Basket)
const Basket = sequelize.define('basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  
});

// Модель елементів кошика (для квіток)
const BasketFlower = sequelize.define('basketFlower', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  basketId: { type: DataTypes.INTEGER, allowNull: false/*, references: { model: 'basket', key: 'id' } */},
  flowerId : { type: DataTypes.INTEGER, allowNull: false/*, references: { model: 'flower', key: 'id' } */},
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
});

// Модель замовлення
const Order = sequelize.define('order', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  totalPrice: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" },
});

// Модель позиції замовлення (може містити як квітку, так і букет)
const OrderItem = sequelize.define('orderItem', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  quantity: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 1 },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
});

const CartItem = sequelize.define('CartItem', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
      type: DataTypes.STRING,
      allowNull: false
  },
  description: {
      type: DataTypes.TEXT,
      allowNull: false
  },
  price: {
      type: DataTypes.FLOAT,
      allowNull: false
  },
  imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
  },
  quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1
  }
});

// Basket.hasMany(BasketFlower, { foreignKey: 'basketId' });
// BasketFlower.belongsTo(Basket, { foreignKey: 'basketId' });
// BasketFlower.belongsTo(Flower, { foreignKey: 'flowerId' });

// User.hasMany(CartItem, { foreignKey: 'userId' });
// CartItem.belongsTo(User, { foreignKey: 'userId' });

User.hasOne(Basket);
Basket.belongsTo(User);

User.hasMany(Rating);
Rating.belongsTo(User);

User.hasMany(Order);
Order.belongsTo(User);

Flower.hasMany(Rating);
Rating.belongsTo(Flower);

Bouquet.belongsToMany(Flower, { through: BouquetFlower });
Flower.belongsToMany(Bouquet, { through: BouquetFlower });

Basket.hasMany(BasketFlower);
BasketFlower.belongsTo(Basket);

Flower.hasMany(BasketFlower);
BasketFlower.belongsTo(Flower);

Order.hasMany(OrderItem);
OrderItem.belongsTo(Order);

Flower.hasMany(OrderItem);
OrderItem.belongsTo(Flower);

Bouquet.hasMany(OrderItem);
OrderItem.belongsTo(Bouquet);

module.exports = {
  User,
  Flower,
  Bouquet,
  BouquetFlower,
  Rating,
  Basket,
  BasketFlower,
  Order,
  OrderItem,
  CartItem,
};
