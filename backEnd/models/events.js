//Model eventille

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema(
  {
    metadata : {
      eventName: String,
      eventImage: String,
      address: String,
      lat: String,
      long: String,
      visibility: String,
      colorScheme: String
    },
    about : {
      eventWebUrl: String,
      eventPlace: {
          name: String,
          address: String,
          phone: String,
          email: String,
      },
      title: String,
      bodyText1: String,
      bodyText2: String,
      bodyText3: String,
      bodyText4: String,
      moreInformation: {
          eventWebsite: String,
          organizer: String,
          email: String
      },
      disclaimer1: String,
      disclaimer2: String
    },
    participants : [
      {
        Country: String,
        FirstName: String,
        LastName: String,
        Email: String,
        Phone: String,
        Company: String
      }
    ],
    programme: [
      {
        day: String,
        content: [
          {
            Time: String,
            Location: String,
            Description: String,
            NameOfSpeaker: String,
            TitleOfSpeaker: String,
            SpecialTitleOfSpeaker: String,
            CompanyOfSpeaker: String,
            Pdf: String
          }
        ]
      }
    ],
    speakers : [
      {
        Speaker: String,
        Title: String,
        SpecialTitle: String,
        Company: String,
        Description: String,
        ImageID: String
      }
    ],
    sponsors : [
      {
        CompanyName: String,
        CompanyUrl: String,
        ImageID: String
      }
    ],
    venue: [
      {
        title: String,
        image: String
      }
    ],
    mapData: {
      restaurants: [
        {
          lat: String,
          long: String,
          name: String,
          address: String,
          description: String,
          category: String,
          rating: String,
          webURL: String,
          image: String
        }
      ],
      hotels: [
        {
          lat: String,
          long: String,
          name: String,
          address: String,
          description: String,
          rating: String,
          webURL: String,
          image: String
        }
      ],
      others: [
        {
          lat: String,
          long: String,
          name: String,
          address: String,
          description: String,
          category: String,
          webURL: String,
          image: String
        }
      ]
    }
  }
);

const Event = mongoose.model('events',EventSchema);

module.exports = Event;



                

