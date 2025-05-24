const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  user_id: { type: Number, required: true },
  action: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  details: { type: Object } // Зберігає неструктуровані дані
});

module.exports = mongoose.model('Log', logSchema);
