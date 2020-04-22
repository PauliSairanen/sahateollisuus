const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Event = require('../models/events')
const Auth = require('../models/auth')
const bodyParser = require('body-parser')
const cors = require('cors');

events = new Events();

var urlencodedParser = bodyParser.json({extended: false});

// ONGELMA JOHTUI HEADEREISTÄ
router.post('/add', urlencodedParser, (req, res) => {
    if(req.body.variable == "jotain"){
        res.send(200)
    }
    else res.send(404);
    res.end();
});

// Authentication routes
router.post('/authenticate', cors(), urlencodedParser, events.Authenticate);
router.get('/findAdmin', events.findAdmin);

// Test routes routes for create, update and delete db queries
router.post('/createEvents', cors(), urlencodedParser, events.createEvents);
router.post('/createEvent', cors(), urlencodedParser, events.createEvent);
router.post('/updateEvent', cors(), urlencodedParser, events.updateEvent);
router.post('/deleteEvent', cors(), urlencodedParser, events.deleteEvent);

// Event data get routes
router.post('/findAll', cors(), urlencodedParser, events.findAll);
router.post('/findEvent', cors(), urlencodedParser, events.findEvent);
router.get('/findMetadata', events.findMetadata);
router.get('/findAllParticipants', events.findAllParticipants);
router.get('/findAbout', events.findAbout);
router.get('/findParticipants', events.findParticipants);
router.get('/findProgramme', events.findProgramme);
router.get('/findSpeakers', events.findSpeakers);
router.get('/findSponsors', events.findSponsors);

// Save routes (currently test routes for admin panel)
router.post('/testEventMaterials', cors(), urlencodedParser, events.testEventMaterials);
router.post('/testEventsNavi', cors(), urlencodedParser, events.testEventsNavi);
router.post('/testInfoEdit', cors(), urlencodedParser, events.testInfoEdit);
router.post('/testLogin', cors(), urlencodedParser, events.testLogin);
router.post('/testParticipants', cors(), urlencodedParser, events.testParticipants);
router.post('/testProgram', cors(), urlencodedParser, events.testProgram);
router.post('/testSpeakers', cors(), urlencodedParser, events.testSpeakers);
router.post('/testSponsors', cors(), urlencodedParser, events.testSponsors);

module.exports = router

