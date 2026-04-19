const mongoose = require('mongoose');

const healthLogSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, default: Date.now },
  weight: { type: Number },
  calories: { type: Number },
  steps: { type: Number },
  water: { type: Number },
  sleep: { type: Number },
  notes: { type: String },
}, { timestamps: true });

module.exports = mongoose.model('HealthLog', healthLogSchema);
