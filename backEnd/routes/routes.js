const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Event = require('../models/events')
const Auth = require('../models/auth')
const bodyParser = require('body-parser')

events = new Events();

var urlencodedParser = bodyParser.urlencoded({extended: false});

// ONGELMA JOHTUI HEADEREISTÄ
router.post('/add', urlencodedParser, (req, res) => {
    if(req.body.variable == "jotain"){
        res.send(200)
    }
    else res.send(404);
    res.end();
});
router.post('/authenticate', urlencodedParser, events.Authenticate);
router.get('/findAdmin', events.findAdmin);
router.get('/createEvents', events.createEvents);
router.get('/updateEvent', events.updateEvent);
router.get('/findMetadata', events.findMetadata);
router.get('/findAllParticipants', events.findAllParticipants);
router.get('/findAbout', events.findAbout);
router.get('/findParticipants', events.findParticipants);
router.get('/findProgramme', events.findProgramme);
router.get('/findSpeakers', events.findSpeakers);
router.get('/findSponsors', events.findSponsors);

router.get('/getfile/*', events.getOneFile);
//router.get('/putfile*', events.putOneFile);
router.post('/putfile*', events.putOneFile);

module.exports = router

