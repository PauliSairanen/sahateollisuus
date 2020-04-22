const EventSchema = require('../models/DEPRECATEDevent');
const config = require('../config/config');
const mongoose = require('mongoose');
const Event = require('../models/events');
const Auth = require('../models/auth');
const {v1: uuidv1} = require('uuid');

class Events {

    //Event creation functions
    createEvents(req, res){
        
        Event.collection.drop();

        var metadataJSON1 = require('../jsonFiles/event1Metadata.json');
        var metadataJSON2 = require('../jsonFiles/event2Metadata.json');
        var aboutJSON = require('../jsonFiles/about.json');
        var participantsJSON = require('../jsonFiles/participants.json');
        var programmeJSON = require('../jsonFiles/programme.json');
        var speakerJSON = require('../jsonFiles/speakers.json');
        var sponsorsJSON = require('../jsonFiles/sponsors_Urls.json');

        var event1 = new Event({
            metadata: metadataJSON1,
            about : aboutJSON,
            participants : participantsJSON,
            programme : programmeJSON,
            speakers : speakerJSON,
            sponsors : sponsorsJSON,
        });

        var event2 = new Event({
            metadata: metadataJSON2,
            about : aboutJSON,
            participants : participantsJSON,
            programme : programmeJSON,
            speakers : speakerJSON,
            sponsors : sponsorsJSON,
        });

        // var event1 = new Event({
        //   eventId : "1",
        //   eventIdForVisibilityRegardingUser : "String",
        //   about : aboutJSON,
        //   participants : participantJSON,
        //   programme : programmeJSON,
        //   speakers : speakerJSON,
        //   sponsors : sponsorsJSON
        // });

        // Creating a event according to schema
        // var event1 = new Event({
            
        // });
                
        //Insert to DB
        event1.save().then(function(){
            console.log("Event was saved");
        });

        event2.save().then(function(){
            console.log("Event was saved");
        });

        res.send(200);

        res.end();
    }

    createEvent(req, res){

        var metadataJSON1 = require('../jsonFiles/event1Metadata.json');
        var aboutJSON = require('../jsonFiles/about.json');
        var participantsJSON = require('../jsonFiles/participants.json');
        var programmeJSON = require('../jsonFiles/programme.json');
        var speakerJSON = require('../jsonFiles/speakers.json');
        var sponsorsJSON = require('../jsonFiles/sponsors_Urls.json');

        var event1 = new Event({
            metadata: metadataJSON1,
            about : aboutJSON,
            participants : participantsJSON,
            programme : programmeJSON,
            speakers : speakerJSON,
            sponsors : sponsorsJSON,
        });

        event1.save().then(function(){
            console.log("Event was saved");
        });

        res.send(200);

        res.end();
    }

    //Event delete functions
    deleteEvent(req, res){
        Event.findByIdAndDelete({_id: req.body.id}, function(err, doc){
            console.log(err);
        });
        var a = Event.find({}, {"metadata": 1}).then(function(a){
            res.send(a);

            res.end();
        });
    }

    //Event update functions
    updateEvent(req, res){

        var metadataJSON1 = require('../jsonFiles/event1Metadata.json');

        Event.findOne({_id: "5e8dfbce0482b55473e7988b"}, function(err, event){
            event.metadata = metadataJSON1;
            event.save(function(err){
            });
        });

        res.send(200);

        res.end();
    }

    //Event get functions
    findEvent(req, res){
        var a = Event.find({_id: req.body.id}).then(function(a){
            res.send(a[0]);
            res.end();
        });
    }

    findAll(req, res){
        var a = Event.find({}).then(function(a){
            console.log(a);
            res.send(a[0]);
            res.end();
        });
    }

    findAdmin(req, res){
        var a = Auth.find({}, {"admin": 1}).then(function(a){
            
            res.send(a);

            res.end();
        });
    }

    Authenticate(req, res){
        var a = Auth.find({}, {"admin": 1}).then(function(a){

            var name = req.body.un;
            var pass = req.body.pw;

            if(name == a[0].admin.username && pass == a[0].admin.password){
                res.send(200);
                res.end();
            }
            
            else {
                res.send(req.body); res.end();
            }

            // res.send(200);
            // res.end();
        });
    }

    findMetadata(req, res){
        var a = Event.find({}, {"metadata": 1}).then(function(a){
            res.send(a);

            res.end();
        });
    }
    
    findAllParticipants(req, res){
        var a = Event.find({"_id": "5e8587bcb60163143f5cc292"},{"participants": 1}).then(function(a){
            console.log(a);
            
            res.send(a);

            res.end();
        });
    }

    findAbout(req, res){
        var a = Event.find({"_id": "5e8587bcb60163143f5cc292"},{"about": 1}).then(function(a){
            console.log(a);
            
            res.send(a[0]);

            res.end();
        });
    }
    findParticipants(req, res){
        
        var a = Event.find({"_id": req},{"participants": 1}).then(function(a){
            //let muuttuja = sortParticipants(a[0].participants)
            
            a[0].participants.forEach(function(e, i) {
                // Kaikkien henkilöiden looppaamiseen
                console.log(a[0].participants[i]);
            });
            console.log(a[0].participants[0]); // Loggaa ensimmäisen henkilön
            res.send(a[0]);
            //res.send(a[0].participants);
            //console.log(a[0].participants);
            res.end();
        });
    }
    findProgramme(req, res){
        var a = Event.find({"_id": req},{"programme": 1}).then(function(a){
            console.log(a);
            
            res.send(a[0]);

            res.end();
        });
    }
    findSpeakers(req, res){
        var a = Event.find({"_id": "5e8dfbce0482b55473e7988b"},{"speakers": 1}).then(function(a){
            console.log(a);

            res.send(a[0]);

            res.end();
        });
    }
    findSponsors(req, res){
        var a = Event.find({"_id": req},{"sponsors": 1}).then(function(a){
            console.log(a);
            
            res.send(a[0]);

            res.end();
        });
    }

    // Test functions
    saveSpeakers(req, res){
        // req on JSON
        var i = 0;
        var arr = [];

        req[0].forEach(function(){
            
            var id = uuidv1();
            var image = req[1][i];

            if(image == "missing"){
                var obj = {
                    "Speaker": req[0][i].Speaker,
                    "Title": req[0][i].Title,
                    "SpecialTitle": req[0][i].SpecialTitle,
                    "Company": req[0][i].Company,
                    "imageID": "missing image"
                }
                i++;
                arr.push(obj);
            }
            else{
                var obj = {
                    "Speaker": req[0][i].Speaker,
                    "Title": req[0][i].Title,
                    "SpecialTitle": req[0][i].SpecialTitle,
                    "Company": req[0][i].Company,
                    "imageID": id
                }
                i++;
                arr.push(obj);
            }
        });

        Event.updateOne({ speakers: arr }, function(err, res){
        });
        
        res.send(arr);
        res.end();
    }

    testEventMaterials(req, res){
            res.write(JSON.stringify(req.body));
            res.write('\n');
            res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
            res.end();
    }
    testEventsNavi(req, res){
        var a = Event.find({}).then(function(a){
            console.log(a);
            res.send(a);
            res.end();
        });
    }
    testInfoEdit(req, res){
        res.write(JSON.stringify(req.body));
        res.write('\n');
        res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
        res.end();
    }
    testLogin(req, res){
        res.write(JSON.stringify(req.body));
        res.write('\n');
        res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
        res.end();
    }
    testParticipants(req, res){
        res.write(JSON.stringify(req.body));
        res.write('\n');
        res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
        res.end();
    }
    testProgram(req, res){
        res.write(JSON.stringify(req.body));
        res.write('\n');
        res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
        res.end();
    }
    testSpeakers(req, res){
        res.write(JSON.stringify(req.body));
        res.write('\n');
        res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
        res.end();
    }
    testSponsors(req, res){
        res.write(JSON.stringify(req.body));
        res.write('\n');
        res.write("Jos mukana tuli se mitä lähetit niin tämä toimii");
        res.end();
    }
}

module.exports = Events;

// Alternative way to use funtions in routes
//module.exports.findAll = function(){
//    var a = Item.find().then(function(a){
//        console.log(a);
//        return 1;
//    });
//}


