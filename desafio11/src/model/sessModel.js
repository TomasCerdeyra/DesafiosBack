const mongoose = require('mongoose');

const Schema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const SessModel = mongoose.model("accounts", Schema);

module.exports = { SessModel };