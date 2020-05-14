const mongoose = require('mongoose');
const Event = require('../models/events');
const Auth = require('../models/auth');
const EventAuth = require('../models/eventAuth');
const {v1: uuidv1} = require('uuid');

class Events {

    //Testilogiikka autentikoinnille
    //Testaa täsmääkö lähetetyt käyttäjätunnus ja salasana adminin tietokannasta löytyviä arvoja
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

    //Login

    login(req, res, next){
        Auth.find({}, {"admin": 1})
        .exec()
        .then(user => {
            console.log(user);
            if(user[0].admin.password == req.body.pass){
                res.send(200)
            }
            else res.send(404)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
    }

    //Eventin luontiin liittyvät funktiot

    //Luo yhden uuden eventin kovakoodattujen jsonien pohjalta
    createEventFromJSON(req, res){

        var metadataJSON2 = require('../jsonFiles/event2Metadata.json');
        var aboutJSON = require('../jsonFiles/about.json');
        var participantsJSON = require('../jsonFiles/participants.json');
        var programmeJSON = require('../jsonFiles/programme.json');
        var speakerJSON = require('../jsonFiles/speakers.json');
        var sponsorsJSON = require('../jsonFiles/sponsors_Urls.json');

        var event = new Event({
            metadata: metadataJSON2,
            about : aboutJSON,
            participants : participantsJSON,
            programme : programmeJSON,
            speakers : speakerJSON,
            sponsors : sponsorsJSON,
        });

        event.save().then(function(err){
            console.log("Event was saved");
        });

        res.send("Event was created");
        res.end();
    }

    //Luo yhden uuden eventin res bodyn pohjalta pohjalta
    createEvent(req, res){

        var metadataJSON = req.body.metadata;
        var aboutJSON = req.body.about;
        var participantsJSON = req.body.participants;
        var programmeJSON = req.body.programme;
        var speakerJSON = req.body.speakers;
        var sponsorsJSON = req.body.sponsors;

        var event = new Event({
            metadata: metadataJSON,
            about : aboutJSON,
            participants : participantsJSON,
            programme : programmeJSON,
            speakers : speakerJSON,
            sponsors : sponsorsJSON
        });

        event.save().then(function(err){
            console.log("Event was saved");
            var eventAuth = new EventAuth({
                eventName: req.body.metadata.eventName,
                eventPass: req.body.eventPass
            });
    
            eventAuth.save().then(function(err){
                console.log("EventAuth was saved");
            });
        });

        res.send("Event was created");
        res.end();
    }

    findEventPass(req, res){
        var b = EventAuth.find({}).then(function(b){
            res.send(b);
            res.end();
        });
        // EventAuth.collection.drop();
    }


    //Eventin delete funktiot

    //Poistaa eventin id mukaan
    deleteEvent(req, res){
        var a = Event.find({_id: req.body.id}).then(function(a){
            var e = a[0].metadata.eventName;
            
            Event.findByIdAndDelete({_id: req.body.id}, function(err, doc){
                console.log(err);
            });
            EventAuth.deleteOne({eventName: e}, function(err, doc){
                console.log(err);
            });
            res.send("Event was deleted")
            res.end();
        });
        // var b = Event.find({}, {"metadata": 1}).then(function(b){
        //     res.send(b);

        //     res.end();
        // });
    }

    //Eventin update funktiot

    //Päivittää testimielessä sponsorit
    updateEvent(req, res){

        var metadataJSON1 = require('../jsonFiles/event1Metadata.json');
        var sponsorsJSON = require('../jsonFiles/sponsors_Urls.json');

        Event.findOne({_id: req.body.id}, function(err, event){
            event.metadata = req.body.metadata;
            event.about = req.body.about;
            event.participants = req.body.participants;
            event.programme = req.body.programme;
            event.speakers = req.body.speakers;
            event.sponsors = req.body.sponsors;
            event.save(function(err){
                console.log("Event was updated");
            });
        });

        res.send("Event was updated");

        res.end();
    }

    //Tallentaa kuvan tiedosksi
    saveImage(req, res){
        if(req.file) {
            res.json(req.file);
        }
        else throw 'error';
    }

    //Event get functions

    //Hakee eventin idn mukaan
    findEvent(req, res){
        var a = Event.find({_id: req.body.id}).then(function(a){
            res.send(a);
            res.end();
        });
    }

    findEventsByEmail(req, res){
        var a = Event.find({"participants.Email": req.body.email},{metadata: 1}).then(function(a){
            res.send(a);
            res.end();
        });
    }

    //Hakee aivan kaiken
    findAll(req, res){
        var a = Event.find({}).then(function(a){
            console.log(a);
            res.send(a[0]);
            res.end();
        });
    }

    

    //Etsii kaikkien eventtien metadata kentät
    findMetadata(req, res){
        var a = Event.find({}, {"metadata": 1}).then(function(a){
            res.send(a);

            res.end();
        });
    }
    
    //Etsii kaikkien eventtien participants kentät
    findAllParticipants(req, res){
        var a = Event.find({},{"participants": 1}).then(function(a){
            console.log(a);
            
            res.send(a);

            res.end();
        });
    }

    //Etsii about kentän eventin idn mukaan
    findAbout(req, res){
        var a = Event.find({_id: req.body.id},{"about": 1}).then(function(a){
            console.log(a);
            
            res.send(a[0]);

            res.end();
        });
    }

    //Etsii participants kentän eventin idn mukaan
    findParticipants(req, res){
        
        var a = Event.find({_id: req.body.id},{"participants": 1}).then(function(a){
            
            a[0].participants.forEach(function(e, i) {
                console.log(a[0].participants[i]);
            });
            console.log(a[0].participants[0]);
            res.send(a[0]);
            res.end();
        });
    }
    
    //Etsii programme kentän eventin idn mukaan
    findProgramme(req, res){
        var a = Event.find({_id: req.body.id},{"programme": 1}).then(function(a){
            console.log(a);
            
            res.send(a[0]);

            res.end();
        });
    }

    //Etsii speakers kentän eventin idn mukaan
    findSpeakers(req, res){
        var a = Event.find({_id: req.body.id},{"speakers": 1}).then(function(a){
            console.log(a);

            res.send(a);

            res.end();
        });
    }

    //Etsii sponsors kentän eventin idn mukaan
    findSponsors(req, res){
        var a = Event.find({_id: req.body.id},{"sponsors": 1}).then(function(a){
            console.log(a);
            
            res.send(a);

            res.end();
        });
    }

    // Testi funktiot
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


