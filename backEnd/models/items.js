const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: String,
    weight: Number
});

const Item = mongoose.model('items',ItemSchema);

module.exports = Item;