const EventSchema = require('../models/events');

const EventModel = mongoose.model('Event', EventSchema);

function findAll() {
    var event = EventModel.find();
}