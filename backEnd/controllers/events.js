const mongoose = require('mongoose');
const fs = require('fs');
const rimraf = require('rimraf');
const path = require('path');
const Event = require('../models/events');
const Auth = require('../models/auth');
const EventAuth = require('../models/eventAuth');
const EventAuthAdmin = require('../models/eventAuthAdmin');
const {v1: uuidv1} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ADMIN_KEY = "secretkeyforadmin";
const APP_KEY = "secretkeyforapp";

class Events {

    //Login

    mobileLogin(req, res, next){
        EventAuth.find({eventName: req.body.eventName})
        .exec()
        .then(user => {
            if(user[0].eventName == req.body.eventName){
                bcrypt.compare(req.body.password, user[0].eventPass, (err, result) => {
                    if(err){
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    if(result){
                        const token = jwt.sign(
                            {
                                username: req.body.eventName
                            },
                            APP_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        })
                    }
                    else return res.status(401).json({
                        message: 'Auth failed',
                    })
                })
            }
            else return res.status(401).json({
                message: 'Auth failed'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        //Luonti
        // bcrypt.hash("SahaPäälikkö1", 10, (err, hash) => {
        //     var auth = new Auth({
        //         username: "SahaAdmin1",
        //         password: hash
        //     });
        //     auth.save().then(function(err){
        //         Auth.find({}).then(function(a){
        //             res.send(a);
        //             res.end();
        //         });
        //     });
        // })
    }

    adminLogin(req, res, next){
        Auth.find({})
        .exec()
        .then(user => {
            if(user[0].username == req.body.username){
                bcrypt.compare(req.body.password, user[0].password, (err, result) => {
                    if(err){
                        return res.status(401).json({
                            message: 'Auth failed'
                        })
                    }
                    if(result){
                        const token = jwt.sign(
                            {
                                username: req.body.username
                            },
                            ADMIN_KEY,
                            {
                                expiresIn: "1h"
                            }
                        );
                        return res.status(200).json({
                            message: 'Auth successful',
                            token: token
                        })
                    }
                    else return res.status(401).json({
                        message: 'Auth failed'
                    })
                })
            }
            else return res.status(401).json({
                message: 'Auth failed'
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });

        //Luonti
        // bcrypt.hash("SahaPäälikkö1", 10, (err, hash) => {
        //     var auth = new Auth({
        //         username: "SahaAdmin1",
        //         password: hash
        //     });
        //     auth.save().then(function(err){
        //         Auth.find({}).then(function(a){
        //             res.send(a);
        //             res.end();
        //         });
        //     });
        // })
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
        if(req.body.eventPass && req.body.metadata.eventName){
            var metadataJSON = req.body.metadata;
            var aboutJSON = req.body.about;
            var participantsJSON = req.body.participants;
            var programmeJSON = req.body.programme;
            var speakerJSON = req.body.speakers;
            var sponsorsJSON = req.body.sponsors;
            var venueJSON = req.body.venue;
            var mapDataJSON = req.body.mapData;

            var event = new Event({
                metadata: metadataJSON,
                about : aboutJSON,
                participants : participantsJSON,
                programme : programmeJSON,
                speakers : speakerJSON,
                sponsors : sponsorsJSON,
                venue : venueJSON,
                mapData : mapDataJSON
            });

            event.save().then(function(err){
                console.log("Event was saved");
                bcrypt.hash(req.body.eventPass, 10, (err, hash) => {
                    var eventAuth = new EventAuth({
                        eventName: req.body.metadata.eventName,
                        eventPass: hash
                    });
                    eventAuth.save().then(function(err){
                        console.log("EventAuth was saved");
                        var eventAuthAdmin = new EventAuthAdmin({
                            eventName: req.body.metadata.eventName,
                            eventPass: req.body.eventPass
                        })
                        eventAuthAdmin.save().then(function(err){
                            console.log("EventAuthAdmin was saved");
                            var a = Event.find({"metadata.eventName": req.body.metadata.eventName}, {_id: 1}).then(function(a){
                                res.send(a[0]);
                                res.end();
                            })
                        });       
                    });
                })
            });
        }
        else res.status(400).json({
            message: 'Missing required event information'
        })
    }

    findEventPass(req, res){
        var b = EventAuth.find({}).then(function(b){
            res.send(b);
            res.end();
        });
        // EventAuth.collection.drop();
    }

    findEventPlaintextPass(req, res){
        var b = EventAuthAdmin.find({}).then(function(b){
            res.send(b);
            res.end();
        });
        // EventAuth.collection.drop();
    }

    //Eventin delete funktiot

    //Poistaa eventin id mukaan
    deleteEvent(req, res){
        // EventAuthAdmin.findByIdAndDelete({_id: req.body.id}, function(err, doc){
        //     console.log(err);
        // });
        // EventAuthAdmin.deleteMany({eventName: req.body.id}, function(err, doc){
        //     console.log(err);
        // });
        if(req.body.id){
            rimraf(path.join(__dirname, '../public/' + req.body.id), function () {
                console.log("Files removed");
            });
        }
        if((req.body.id).length == 24)
        var a = Event.find({_id: req.body.id}).then(function(a){
            if(a[0]){
                var e = a[0].metadata.eventName;
                Event.findByIdAndDelete({_id: req.body.id}, function(err, doc){
                    console.log(err);
                });
                EventAuth.deleteOne({eventName: e}, function(err, doc){
                    console.log(err);
                });
                EventAuthAdmin.deleteOne({eventName: e}, function(err, doc){
                    console.log(err);
                });

                //tähän rmdir takasin
                res.status(200).json({
                    message: 'Event was deleted'
                })
                res.end();
            }
            else res.status(404).json({
                message: 'No event was found'
            })
        });
        else res.status(400).json({
            message: 'Incorrect id format'
        })
    }

    //Eventin update funktiot

    //Päivittää eventin
    updateEvent(req, res){
        if((req.body.id).length == 24){ 
            Event.findOne({_id: req.body.id}, function(err, event){
                if(event){
                    EventAuth.findOne({eventName: event.metadata.eventName}, function(err, auth){
                        console.log(auth);
                        if(auth){
                            console.log(req.body.eventPass);
                            bcrypt.hash(req.body.eventPass, 10, (err, hash) => {
                            console.log(hash);
                            console.log(req.body.metadata.eventName);
                            auth.eventName = req.body.metadata.eventName;
                            auth.eventPass = hash;

                            auth.save(function(err){
                                console.log("Auth was updated");
                            });
                            })

                            EventAuthAdmin.findOne({eventName: event.metadata.eventName}, function(err, authPlain){
                                authPlain.eventName = req.body.metadata.eventName,
                                authPlain.eventPass = req.body.eventPass
                                authPlain.save(function(err){
                                    console.log("Plaintext auth was updated");
                                });
                            });

                            event.metadata = req.body.metadata;
                            event.about = req.body.about;
                            event.participants = req.body.participants;
                            event.programme = req.body.programme;
                            event.speakers = req.body.speakers;
                            event.sponsors = req.body.sponsors;
                            event.venue = req.body.venue;
                            event.mapData = req.body.mapData;

                            event.save(function(err){
                                console.log("Event was updated");
                            });

                        }
                        else {
                            // res.status(404).json({
                            //     message: 'Matching auth was not found'
                            // })
                        }
                    });
                    res.status(200).json({
                        message: 'Event updated'
                    });
                    res.end();   
                }
                else {
                        
                }
            });        
        }
        else {
            res.status(401).json({
                message: 'Incorrect id format'
            })
        }
    }

    //Tallentaa kuvan tiedosksi
    saveFile(req, res){
        //res.status(200).send(req.body);
        res.end()
    }

    //Event get functions

    //Hakee eventin idn mukaan
    findEvent(req, res){
        if((req.body.id).length == 24){
            var a = Event.find({_id: req.body.id}).then(function(a){
                if(a[0]){
                    res.status(200).send(a[0]);
                    res.end();
                }
                else {
                    res.status(404).json({
                        message: 'No events were found'
                    });
                    res.end();
                }
            });
        }
        else res.status(400).json({
            message: 'Incorrect id format'
        })
    }
    //asdasd
    findEventsByEmail(req, res){
        if(req.body.email != ""){
            var a = Event.find({"participants.Email": req.body.email},{metadata: 1}).then(function(a){
                if(a[0]){
                    res.status(200).json(a);
                }
                else {
                    res.status(404).json({
                        message: 'No events found'
                    })
                }
            });
        }
        else {
            res.status(404).json({
                message: 'No events found'
            })
        }
    }

    //Hakee aivan kaiken
    findAll(req, res){
        var a = Event.find({"_id": "5edf66f05da09e3ae09d6ded"},{mapData: 1}).then(function(a){
            if(a[0]){
                res.status(200).json(a[0].mapData.hotels[0].name);
            }
            else {
                res.status(404).json({
                    message: 'No events found'
                })
            }
        });
    };

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


