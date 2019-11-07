const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ItemSchema = new Schema(
        {
        eventId : String,
        eventIdForVisibilityRegardingUser : String,
        info: {
            eventName: String,
            titleName: String,
            startTime: String,
            endTime : String,
            place: String,
            image: { data: String, contentType: String },
            eventColor: String
        },
        programme: {
          timeTableObject : {
            name : String,
            startTime : String, 
            endTime : String,
            performerName: String,
            performerTitle : String,
            date : String, 
            description : String
          }
        },
        maps: { 
            colors: {
              restaurants : String,
              hotels : String,
              venue : String,
            },
            restaurants : {   // Restaurant array needs to have ID for color comparison
              restaurantObject: {
                name : String,
                address : String,
                latitude : Number,
                longitude : Number,
              }
            },
            hotels : {
              hotelObject: {
                name : String,
                address : String,
                latitude : String,
                longitude : String,
              }
            },
            venue: {
              location: {
                name : String,
                address : String,
                latitude : String,
                longitude : String,
              } 
            }   
        },
      
        participants : {
          participantsObject: {
            name : String,
            surname : String,
            company : String,
            email : String,
            phoneNumber : String,
            country : String,
            iComeFrom : String,
            participation : {
                marketDay : Boolean,
                dinner : Boolean
            }
          }
        }
});

const Event = mongoose.model('events',ItemSchema);

module.exports = Event;