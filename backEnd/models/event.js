const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    test_data: String,
    test_data2: Number
});

module.exports = EventSchema;