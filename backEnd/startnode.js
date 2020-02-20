//Server CONSTS
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/pki/tls/private/sahat.lamk.fi.key', 'utf8');
const certificate = fs.readFileSync('/etc/pki/tls/certs/sahat.lamk.fi.bundle.crt', 'utf8');

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

const mongoose = require('mongoose');
const Event = require('./models/events');

// Create routes
const routes = require('./routes/routes.js');

// Make app use the routes
app.use(routes)

const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => console.info('Server has started on port: 443'));
// DB THINGS
//mongoose.connect('mongodb://localhost:27017/testdb',{ useNewUrlParser: true }); //local db connection string
mongoose.connect('mongodb://owner:in@localhost:27017/sahateollisuus',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('Connection has been made!');
}).on('error',function(error){
    console.log('Connection error:', error);
});

Event.collection.drop();

var aboutJSON = require('./jsonFiles/about.json');
var participantsJSON = require('./jsonFiles/participants.json');
var programmeJSON = require('./jsonFiles/programme.json');
var speakerJSON = require('./jsonFiles/speakers.json');
var sponsorsJSON = require('./jsonFiles/sponsors_Urls.json');

var event1 = new Event({
  eventId : "1",
  about : aboutJSON,
  participants : participantsJSON,
  programme : programmeJSON,
  speakers : speakerJSON,
  sponsors : sponsorsJSON,
});

// var event1 = new Event({
//   eventId : "1",
//   eventIdForVisibilityRegardingUser : "String",
//   about : aboutJSON,
//   participants : participantJSON,
//   programme : programmeJSON,
//   speakers : speakerJSON,
//   sponsors : sponsorsJSON
// });

// Creating a event according to schema
// var event1 = new Event({
    
// });
        
//Insert to DB
event1.save().then(function(){
    console.log("Event was saved");
});



