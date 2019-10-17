let express = require('express')
const router =  new express.Router()
const Events = require('../controllers/events')

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

var callback = function(data){
  console.log(data);
}
router.get('/event', Events.findAll);         // get event

module.exports = router


