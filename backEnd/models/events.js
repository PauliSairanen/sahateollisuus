//Model eventille

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    metadata : {
      eventName: String,
      eventImage: String
    },
    about : JSON,
    participants : JSON,
    programme : JSON,
    speakers : JSON,
    sponsors : JSON,
    venue: JSON
  }
);

const Event = mongoose.model('events',EventSchema);

module.exports = Event;
