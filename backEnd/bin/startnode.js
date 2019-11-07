const mongoose = require('mongoose');
const express = require('express')
const app = express()
//DB CONSTS
const Event = require('../models/events');
// this starting code for node

// Create routes
const routes = require('../routes/routes.js');

// Make app use the routes
app.use(routes)

// To serve static content (images, html pages etc..)
app.use(express.static('public'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on port: ${PORT}`))

// DB THINGS
//mongoose.connect('mongodb://localhost:27017/testdb',{ useNewUrlParser: true }); //local db connection string
mongoose.connect('mongodb://owner:in@172.30.133.128:27017/sahateollisuus',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('Connection has been made!'); 
}).on('error',function(error){
    console.log('Connection error:', error);
});

Event.collection.drop();

var event1 = new Event({
    eventId : "1",
        eventIdForVisibilityRegardingUser : "String",
        info: {
            eventName: "First event",
            titleName: "String",
            startTime: "String",
            endTime : "String",
            place: "String",
            image: { data: "String", contentType: "String" },
            eventColor: "String"
        },
        programme: {
          timeTableObject : {
            name : "String",
            startTime : "String", 
            endTime : "String",
            performerName: "String",
            performerTitle : "String",
            date : "String", 
            description : "String"
          }
        },
        maps: { 
            colors: {
              restaurants : "String",
              hotels : "String",
              venue : "String",
            },
            restaurants : {   // Restaurant array needs to have ID for color comparison
              restaurantObject: {
                name : "String",
                address : "String",
                latitude : 12,
                longitude : 12,
              }
            },
            hotels : {
              hotelObject: {
                name : "String",
                address : "String",
                latitude : "String",
                longitude : "String",
              }
            },
            venue: {
              location: {
                name : "String",
                address : "String",
                latitude : "String",
                longitude : "String",
              } 
            }   
        },
      
        participants : {
          participantsObject: {
            name : "String",
            surname : "String",
            company : "String",
            email : "String",
            phoneNumber : "String",
            country : "String",
            iComeFrom : "String",
            participation : {
                marketDay : true,
                dinner : true
            }
          }
        }
});
event1.save().then(function(){
    console.log("Event was saved");
});




