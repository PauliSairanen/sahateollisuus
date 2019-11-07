const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Event = require('../models/events')

events = new Events();

router.get('/findAll', events.findAll);
router.get('/findInfo', events.findInfo);
router.get('/findProgramme', events.findProgramme);
router.get('/findMaps', events.findMaps);
router.get('/findParticipants', events.findParticipants);
router.get('/findVisibility', events.findVisibility);

module.exports = router

