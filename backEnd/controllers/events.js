const mongoose = require('mongoose');
const EventSchema = require('../models/event');
const config = require('../config/config')
const EventModel = mongoose.model('Events', EventSchema);

function callback(){

};

class Events {
    
    findAll() {

        EventModel.find()
        if(res != null){
            console.log(event);
            return 1;
        }
        else return 0;
    }
}

module.export = Events;
