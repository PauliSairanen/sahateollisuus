//Server CONSTS
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/pki/tls/private/sahat.lamk.fi.key', 'utf8');
const certificate = fs.readFileSync('/etc/pki/tls/certs/sahat.lamk.fi.bundle.crt', 'utf8');
const mongoose = require('mongoose');
const Auth = require('./models/auth');
const Event = require('./models/events');
const bodyParser = require('body-parser')

var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

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

// Event.collection.drop();

//         var metadataJSON = require('./jsonFiles/metadata.json');
//         var aboutJSON = require('./jsonFiles/about.json');
//         var participantsJSON = require('./jsonFiles/participants.json');
//         var programmeJSON = require('./jsonFiles/programme.json');
//         var speakerJSON = require('./jsonFiles/speakers.json');
//         var sponsorsJSON = require('./jsonFiles/sponsors_Urls.json');

//         var event1 = new Event({
//             metadata: metadataJSON,
//             about : aboutJSON,
//             participants : participantsJSON,
//             programme : programmeJSON,
//             speakers : speakerJSON,
//             sponsors : sponsorsJSON,
//         });

//         var event2 = new Event({
//             metadata: metadataJSON,
//             about : aboutJSON,
//             participants : participantsJSON,
//             programme : programmeJSON,
//             speakers : speakerJSON,
//             sponsors : sponsorsJSON,
//         });

//         Insert to DB
//         event1.save().then(function(){
//             console.log("Event was saved");
//         });

//         event2.save().then(function(){
//             console.log("Event was saved");
//         });

//Auth.collection.drop();

var adminJSON = require('./jsonFiles/admin.json');

var adminAuth = new Auth({
    admin: adminJSON
});

adminAuth.save().then(function(){
    console.log("Event was saved");
});

Auth.collection.drop();