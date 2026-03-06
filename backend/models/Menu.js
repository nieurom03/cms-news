const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  label: { type: String, required: true },
  url: String,
  type: { type: String, enum: ['link', 'category', 'page'], default: 'link' },
  target: { type: String, enum: ['_self', '_blank'], default: '_self' },
  order: { type: Number, default: 0 },
  parentId: { type: String, default: null },
  active: { type: Boolean, default: true }
});

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String, required: true, enum: ['header', 'footer', 'sidebar'] },
  items: [menuItemSchema],
  active: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Menu', menuSchema);
