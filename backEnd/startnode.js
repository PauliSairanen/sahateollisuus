//Requires
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/pki/tls/private/sahat.lamk.fi.key', 'utf8');
const certificate = fs.readFileSync('/etc/pki/tls/certs/sahat.lamk.fi.bundle.crt', 'utf8');
const mongoose = require('mongoose');
const Auth = require('./models/auth');
const Event = require('./models/events');
const bodyParser = require('body-parser');
const cors = require('cors');

//Credentials
var credentials = {key: privateKey, cert: certificate};
var express = require('express');
var app = express();

// Routejen käyttöönotto
const routes = require('./routes/routes.js');

app.use(routes);

//Cors asetukset
const corsOptions = {
    origin: '*',
    methods: 'POST'
  }

//Express static kuville
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));


//Express serverin luonti
const httpsServer = https.createServer(credentials, app);

httpsServer.listen(443, () => console.info('Server has started on port: 443'));

//MongoDB yhteys
mongoose.connect('mongodb://owner:in@localhost:27017/sahateollisuus',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('Connection has been made!');
}).on('error',function(error){
    console.log('Connection error:', error);
});