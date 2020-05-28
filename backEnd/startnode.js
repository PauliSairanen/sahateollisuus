//Requires
var express = require('express');
var app = express();
var path = require('path')
const fs = require('fs');
const https = require('https');
const privateKey  = fs.readFileSync('/etc/pki/tls/private/sahat.lamk.fi.key', 'utf8');
const certificate = fs.readFileSync('/etc/pki/tls/certs/sahat.lamk.fi.bundle.crt', 'utf8');
const mongoose = require('mongoose');
const Auth = require('./models/auth');
const Event = require('./models/events');
const bodyParser = require('body-parser');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load(path.join(__dirname, './jsonFiles/swagger.yaml'));

//API version
let APIv = 2020051513 // vuosi.kuukausi.päivä.tunti
//Credentials
var credentials = {key: privateKey, cert: certificate};

//Swagger setup
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//Pre-flight asetus JSON post routeille.
app.options('*', cors()) // include before other routes. Enables PF for all routes

// Routejen käyttöönotto
const routes = require('./routes/routes.js');

app.use(routes);
// Default route
app.get('/',
	function(req, res)
	{
		res.send(`<h1>API versio: ${APIv}</h1>`);
	}
);

//Cors asetukset
const corsOptions = {
    origin: '*',
    methods: 'POST'
  }

//Express static kuville
app.use(express.static('public'));
app.use('/images', express.static(__dirname + '/images'));
app.use('/jsonFiles', express.static(__dirname + '/jsonFiles'));

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