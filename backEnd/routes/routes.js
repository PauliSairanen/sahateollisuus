const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Event = require('../models/events')

events = new Events();

router.get('/findAll', events.findAll);
router.get('/findAbout', events.findAbout);
router.get('/findParticipants', events.findParticipants);
router.get('/findProgramme', events.findProgramme);
router.get('/findSpeakers', events.findSpeakers);
router.get('/findSponsors', events.findSponsors);

router.get('/getfile/*', events.getOneFile);
//router.get('/putfile*', events.putOneFile);
router.post('/putfile*', events.putOneFile);

module.exports = router

