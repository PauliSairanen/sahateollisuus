const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Event = require('../models/events')
const Auth = require('../models/auth')
const bodyParser = require('body-parser')
const cors = require('cors');
const path = require('path');

// Middlewares
const checkAdminAuth = require('../middleware/checkAdminToken');
const checkAppAuth = require('../middleware/checkAppToken');

// Multer setup
const multer = require('multer');
const fs = require('fs');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      console.log(req.headers.category)
      if(req.headers.category == "venue"){
        cb(null, path.join(__dirname, '../images/venueImages'));
      }
      else if(req.headers.category == "speakers"){
        cb(null, path.join(__dirname, '../images/speakerImages'));
      }
      else if(req.headers.category == "sponsors"){
        cb(null, path.join(__dirname, '../images/sponsorImages'));
      }
      else if(req.headers.category == "programme"){
        cb(null, path.join(__dirname, '../images/programmeImages'));
      }
      else if(req.headers.category == "test"){
        cb(null, path.join(__dirname, '../images'));
      }
      else if(req.body.id){
        console.log(path.join(__dirname, '../public/' + req.body.id))
        fs.mkdir(path.join(__dirname, '../public/' + req.body.id), { recursive: false }, (err) => {
          console.log(err);
        });
        cb(null, path.join(__dirname, '../public/' + req.body.id));
      }
      else{
        console.log("Category not defined!")
      }
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname) //array.originalname
    }
  })
  
const upload = multer({ storage: storage });

//Funktioiden importtaus
events = new Events();

//Bodyparse
var jsonParser = bodyParser.json({limit: '50mb', extended: true});

//Testiroute parserille
router.post('/add', jsonParser, (req, res) => {
    if(req.body.variable == "jotain"){
        res.send(200)
    }
    else res.send(404);
    res.end();
});

// Autentikaatio routet
router.get('/findEventPass', cors(), jsonParser, events.findEventPass);
router.get('/findEventPlaintextPass', cors(), jsonParser, events.findEventPlaintextPass);
router.post('/mobileLogin', cors(), jsonParser, events.mobileLogin);
router.post('/adminLogin', cors(), jsonParser, events.adminLogin);

// Test routet create, update and delete db queryille
router.post('/createEventFromJSON', cors(), jsonParser, events.createEventFromJSON);
router.post('/createEvent', cors(), jsonParser, events.createEvent);
router.post('/updateEvent', cors(), jsonParser, events.updateEvent);
router.post('/deleteEvent', cors(), jsonParser, events.deleteEvent);
router.post('/saveFile', cors(), upload.array('myFiles'), events.saveFile); //upload.array('array[]', 1000),

// Relevantit event data get routet

router.post('/findEventsByEmail', cors(), jsonParser, events.findEventsByEmail);

router.post('/findEvent', cors(), jsonParser, events.findEvent);

router.get('/findMetadata', cors(), jsonParser, events.findMetadata);

// Ei niin relevantit tai toimimattomat event data get routet
router.post('/findAll', cors(), jsonParser, events.findAll);
router.get('/findAllParticipants', cors(), jsonParser, events.findAllParticipants);
router.get('/findAbout', cors(), jsonParser, events.findAbout);
router.get('/findParticipants', cors(), jsonParser, events.findParticipants);
router.get('/findProgramme', cors(), jsonParser, events.findProgramme);
router.get('/findSpeakers', cors(), jsonParser, events.findSpeakers);
router.get('/findSponsors', cors(), jsonParser, events.findSponsors);

module.exports = router

