const mongoose = require('mongoose');

const clientInfoSchema = new mongoose.Schema({
  client_id: { type: Number, required: true },
  preferences: [String], // Наприклад, вподобання клієнта
  notes: String,         // Додаткові нотатки
  interactions: [        // Історія взаємодій
    {
      date: { type: Date, default: Date.now },
      type: String,
      comment: String
    }
  ]
});

module.exports = mongoose.model('ClientInfo', clientInfoSchema);
