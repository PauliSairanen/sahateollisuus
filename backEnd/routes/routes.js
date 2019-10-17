let express = require('express')
let router = express.Router()

//this rudimentary version of ruotes
router.get('/getevents/*', (req, res) => {
  res.setHeader("Content-Type","JSON/Application");
  res.send('' + JSON.stringify([{"a":"b"},{"c":"d"},{"e":"f"}]));
  res.end();
})

router.get('/getevent/*', (req, res) => {
    res.setHeader("Content-Type","JSON/Application");
    res.send('' + JSON.stringify({"a":"b"}));
    res.end();
})

router.get('/getevents/*', (req, res) => {
    res.send('You have requested a person');
    res.end();
  })
module.exports = router


