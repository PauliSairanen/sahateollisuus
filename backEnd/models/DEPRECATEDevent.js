//OLD

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    event1: { 
        eventIdForVisibilityRegardingUser : String, 
        eventImage : { data: Buffer, contentType: String },
        info: {
            eventName: String,
            titleName: String,
            startTime: String,
            endTime : String,
            place: String,
            image: { data: Buffer, contentType: String },
            eventColor: String
        },
        
        programme: [
            {
                timeTableObject : {
                    name : String,
                    startTime : String, 
                    endTime : String,
                    performerName: String,
                    performerTitle : String,
                    date : Date, 
                    description : String
                },
            }
        ],
        maps: {
            
            colors: {
              restaurants : String,
              hotels : String,
              venue : String,
            },
            restaurants : [   // Restaurant array needs to have ID for color comparison
              {
                name : String,
                address : String,
                latitude : Number,
                longitude : Number,
              }
            ],
            hotels : [
            {
                name : String,
                address : String,
                latitude : String,
                longitude : String,
            }
            ],
            venue: [
              {
                name : String,
                address : String,
                latitude : String,
                longitude : String,
              } 
            ]
            
        },
      
        Participants : [
            {
              name : String,
              surname : String,
              company : String,
              email : String,
              phoneNumber : String,
              country : String,
              role : String,
              participation : {
                marketDay : Boolean,
                dinner : Boolean
              }
            }
        ],
    }         
});

module.exports = EventSchema;