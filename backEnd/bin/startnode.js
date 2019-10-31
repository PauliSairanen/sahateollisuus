const mongoose = require('mongoose');
const express = require('express')
const app = express()
//DB CONSTS
const Item = require('../models/items');
// this starting code for node

// Create routes
const routes = require('../routes/routes.js');

// Make app use the routes
app.use(routes)

// To serve static content (images, html pages etc..)
app.use(express.static('public'))

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.info(`Server has started on port: ${PORT}`))

// DB THINGS
mongoose.connect('mongodb://localhost:27017/testdb',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('Connection has been made!'); 
}).on('error',function(error){
    console.log('Connection error:', error);
});


var item = new Item({
    name: 'A thing',
    weight: '5'
});
item.save().then(function(){
    console.log("Person was saved");
});

var item2 = new Item({
    name: 'Nothing thing',
    weight: '51'
});
item2.save().then(function(){
    console.log("Person was saved");
});

// Item.collection.drop();



