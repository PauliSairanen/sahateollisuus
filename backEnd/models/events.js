const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    eventId : String,
    about : JSON,
    participants : JSON,
    programme : JSON,
    speakers : JSON,
    sponsors : JSON
  }
);

const ItemSchema = new Schema(
        {
        eventId : String,
        eventIdForVisibilityRegardingUser : String,
        about: {
          "eventWebUrl": String,
          "eventPlace": {
            "name": String,
            "address": String,
            "phone": String,
            "email": String
          },
          "title": String,
          "bodyText1": String,
          "bodyText2": String,
          "bodyText3": String,
          "bodyText4": String,
          "moreInformation": {
            "eventWebsite": String,
            "organizer": String,
            "email": String
          },
          "disclaimer1": String,
          "disclaimer2": String
        },
        participants : [
          {
            "FirstName": String,
            "LastName": String,
            "Email": String,
            "Phone": String,
            "Company": String,
            "Country": String,
            "Icomefrom": String
          }
        ],
        programme: [
          {
            "Time": String,
            "Location": String,
            "Description": String,
            "NameOfSpeaker": String,
            "TitleOfSpeaker": String,
            "SpecialTitleOfSpeaker": String,
            "CompanyOfSpeaker": String
          }
        ],
        speakers: [
          {
           "Speaker": String,
           "Title": String,
           "SpecialTitle": String,
           "Company": String
          }
        ],
        sponsors : [
          {
           "CompanyName": String,
           "CompanyUrl": String
          }
        ]
});

//const Event = mongoose.model('events',ItemSchema);
const Event = mongoose.model('events',EventSchema);

module.exports = Event;