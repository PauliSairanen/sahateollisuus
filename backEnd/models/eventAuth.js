//Model event salasanoille

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventAuthSchema = new Schema(
  {
    eventName: String,
    eventPass: String
  }
);

const EventAuth = mongoose.model('eventAuth', EventAuthSchema);

module.exports = EventAuth;