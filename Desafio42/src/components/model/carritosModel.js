const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    timestamp: { type: String, required: true },
    productos: { type: Array, required: true }
});

const CarritosModel = mongoose.model("carritos", Schema);

module.exports = { CarritosModel };