const EventSchema = require('../models/DEPRECATEDevent');
const config = require('../config/config')
const mongoose = require('mongoose');
const Event = require('../models/events');
const Auth = require('../models/auth');

class Events {

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

    updateEvent(req, res){

        var metadataJSON1 = require('../jsonFiles/event1Metadata.json');

        Event.update({ _id: "5e69f7b299f21917d5e7022d"}, {$set: {metadata: metadataJSON1}});

        res.send(200);

        res.end();
    }

    findAdmin(req, res){
        var a = Auth.find({}, {"admin": 1}).then(function(a){
            
            res.send(a);

            res.end();
        });
    }

    Authenticate(req, res){
        var a = Auth.find({}, {"admin": 1}).then(function(a){

            // var name = req.body.userName;
            // var pass = req.body.password;

            // if(name == a.username && pass == a.password){
            //     res.send(200);
            //     res.end();
            // }
            // else {
            //     res.send(404); res.end();
            // }

            res.send(200);
                res.end();
        });
    }

    findMetadata(req, res){
        var a = Event.find({}, {"metadata": 1}).then(function(a){
            console.log(a);
            
            res.send(a);

            res.end();
        });
    }
    
    findAllParticipants(req, res){
        var a = Event.find({}, {"participants": 1}).then(function(a){
            console.log(a);
            
            res.send(a);

            res.end();
        });
    }

    findAbout(req, res){
        var a = Event.find({"_id": "5e69f7b299f21917d5e7022d"},{"about": 1}).then(function(a){
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
        var a = Event.find({"_id": req},{"speakers": 1}).then(function(a){
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

    //Mitä nämä on?
    getOneFile(req, res){
        var tmpreq=req.url.split("/");
        var filenametmp = fileslocation + tmpreq[tmpreq.length-1];

        var fs=require('fs');
        var filebuf;

        res.setHeader("Content-Type","text/plain");
        try
        {
            
            fs.accessSync(filenametmp,fs.constants.F_OK);
            filebuf=fs.readFileSync(filenametmp,{});
            res.setHeader("Content-Type","image/jpg");
            
        }
        catch(err)
        {filebuf=""}


        //filebuf=fs.readFileSync(filenametmp,{});
        
        //console.log(filebuf);
        res.send(filebuf);
        res.end();
    }
    putOneFile(req, res){

        var fs=require('fs');
        var form = new formidable.IncomingForm();

        //console.log(req);
        form.parse(req, function (err, fields, files) {
        console.log(files.filetoupload.path);
        var newpath = fileslocation + files.filetoupload.name;
        
        fs.rename(files.filetoupload.path,newpath,(err) =>
        {
            if(err)
            {
                res.setHeader("Content-Type","text/plain");
                res.write('File not uploaded and moved!');
            
                res.end();
        
            }
            else
            {
                res.setHeader("Content-Type","text/plain");
                res.write('File uploaded and moved!');
                res.end();
            }
        }
        );

        //res.write('File not uploaded and moved!');
        //res.end();
        //res.setHeader("Content-Type","text/plain");
        //res.send("");

        //res.end();
        });
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


