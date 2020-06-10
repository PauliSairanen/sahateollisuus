//Model event salasanoille

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventAuthAdminSchema = new Schema(
  {
    eventName: String,
    eventPass: String
  }
);

const EventAuthAdmin = mongoose.model('eventAuthAdmin', EventAuthAdminSchema);

module.exports = EventAuthAdmin;