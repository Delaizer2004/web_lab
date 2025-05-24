const { DataTypes } = require('sequelize');
const sequelize = require('../config/postgres');

const Client = sequelize.define('Client', {
  first_name: { type: DataTypes.STRING, allowNull: false },
  last_name: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phone: { type: DataTypes.STRING },
  birth_date: { type: DataTypes.DATEONLY },
  address: { type: DataTypes.STRING },
  city: { type: DataTypes.STRING },
  postal_code: { type: DataTypes.INTEGER },
  comment: { type: DataTypes.TEXT }
}, { tableName: 'clients', timestamps: false });

module.exports = Client;
