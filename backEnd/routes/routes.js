const express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')
const Item = require('../models/items');


events = new Events();

// get all events
router.get('/event', function(req, res){      
  res.send({type: 'GET'});
});

router.get('/asd', function(req, res){      
  res.send(Events.findAll());
});

router.get('/qwe', events.findAll);

router.post('/asdasd', function(req, res){
  var item = new Item(req.body);
  item.save();
  res.send({
    type: 'POST',
    name: req.body.name,
    weight: req.body.weight
  });
});

module.exports = router

//Lassen koodi alkaa
//this rudimentary version of ruotes
// router.get('/getevents/*', (req, res) => {
//   res.setHeader("Content-Type","JSON/Application");
//   res.send('' + JSON.stringify([{"a":"b"},{"c":"d"},{"e":"f"}]));
//   res.end();
// })

// router.get('/getevent/*', (req, res) => {
//     res.setHeader("Content-Type","JSON/Application");
//     res.send('' + JSON.stringify({"a":"b"}));
//     res.end();
// })

// router.get('/getevents/*', (req, res) => {
//     res.send('You have requested a person');
//     res.end();
//   })
// Lassen koodi päättyy

