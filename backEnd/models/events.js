const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    metadata : JSON,
    about : JSON,
    participants : JSON,
    programme : JSON,
    speakers : JSON,
    sponsors : JSON
  }
);

//const Event = mongoose.model('events',ItemSchema);
const Event = mongoose.model('events',EventSchema);

module.exports = Event;
