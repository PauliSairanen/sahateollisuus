const mongoose = require('mongoose');
const EventSchema = require('../models/event');
const config = require('../config/config')
const EventModel = mongoose.model('Events', EventSchema);
const Event = require('../models/events');

class Events {

    findAll(req, res){
        var a = Event.find({"eventId": "1"}).then(function(a){
            console.log(a);
            
            res.send(a);

            res.end();
        });
    }
    findInfo(req, res){
        var a = Event.find({"eventId": "1"},{"info": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].info);

            res.end();
        });
    }
    findProgramme(req, res){
        var a = Event.find({"eventId": "1"},{"programme": 1, _id: 0}).then(function(a){
            console.log(a);

            res.send(a[0].programme);

            res.end();
        });
    }
    findMaps(req, res){
        var a = Event.find({"eventId": "1"},{"maps": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].maps);

            res.end();
        });
    }
    findParticipants(req, res){
        var a = Event.find({"eventId": "1"},{"participants": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].participants);

            res.end();
        });
    }
    findVisibility(req, res){
        var a = Event.find({"eventId": "1"},{"eventIdForVisibilityRegardingUser": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].eventIdForVisibilityRegardingUser);

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


