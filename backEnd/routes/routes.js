const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Event = require('../models/events')
const Auth = require('../models/auth')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');

// Multer setup
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../images/'));
    },
    filename: function (req, file, cb) {
      cb(null, req.body.id + '.png') //Appending .png
      console.log(req.body.id);
    }
  })
  
const upload = multer({ storage: storage });

//Funktioiden importtaus
events = new Events();

//Bodyparse
var jsonParser = bodyParser.json({extended: false});

//Testiroute parserille
router.post('/add', jsonParser, (req, res) => {
    if(req.body.variable == "jotain"){
        res.send(200)
    }
    else res.send(404);
    res.end();
});
//jotain
// Autentikaatio routet
router.post('/authenticate', cors(), jsonParser, events.Authenticate);
router.post('/findEventPass', cors(), jsonParser, events.findEventPass);
router.post('/login', cors(), jsonParser, events.login);

// Test routet create, update and delete db queryille
router.post('/createEventFromJSON', cors(), jsonParser, events.createEventFromJSON);
router.post('/createEvent', cors(), jsonParser, events.createEvent);
router.post('/updateEvent', cors(), jsonParser, events.updateEvent);
router.post('/deleteEvent', cors(), jsonParser, events.deleteEvent);
router.post('/saveImage', cors(), upload.single('file'), events.saveImage);

// Event data get routet
router.post('/findAll', cors(), jsonParser, events.findAll);
router.post('/findEvent', cors(), jsonParser, events.findEvent);
router.post('/findEventsByEmail', cors(), jsonParser, events.findEventsByEmail);
router.get('/findMetadata', cors(), jsonParser, events.findMetadata);
router.get('/findAllParticipants', cors(), jsonParser, events.findAllParticipants);
router.get('/findAbout', cors(), jsonParser, events.findAbout);
router.get('/findParticipants', cors(), jsonParser, events.findParticipants);
router.get('/findProgramme', cors(), jsonParser, events.findProgramme);
router.get('/findSpeakers', cors(), jsonParser, events.findSpeakers);
router.get('/findSponsors', cors(), jsonParser, events.findSponsors);

// Save routet (tällähetkellä testi routet admin paneelille)
router.post('/testEventMaterials', cors(), jsonParser, events.testEventMaterials);
router.post('/testEventsNavi', cors(), jsonParser, events.testEventsNavi);
router.post('/testInfoEdit', cors(), jsonParser, events.testInfoEdit);
router.post('/testLogin', cors(), jsonParser, events.testLogin);
router.post('/testParticipants', cors(), jsonParser, events.testParticipants);
router.post('/testProgram', cors(), jsonParser, events.testProgram);
router.post('/testSpeakers', cors(), jsonParser, events.testSpeakers);
router.post('/testSponsors', cors(), jsonParser, events.testSponsors);

module.exports = router

