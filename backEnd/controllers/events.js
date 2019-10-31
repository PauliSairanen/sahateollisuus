const mongoose = require('mongoose');
const EventSchema = require('../models/event');
const config = require('../config/config')
const EventModel = mongoose.model('Events', EventSchema);
const Item = require('../models/items');

class Events {
    
    dropCollection(){
        var a = Item.find().then(function(a){
            console.log(a);
        });
    }

    findAll(req, res){
        var a = Item.find().then(function(a){
            console.log(a);
            
            res.send(""+ JSON.stringify(a));

            res.end();
        });
    }
}


module.exports = Events;

// Alternativa way to use funtions in routes
//module.exports.findAll = function(){
//    var a = Item.find().then(function(a){
//        console.log(a);
//        return 1;
//    });
//}


