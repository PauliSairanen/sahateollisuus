const mongoose = require('mongoose');
const EventSchema = require('../models/event');
const config = require('../config/config')
const EventModel = mongoose.model('Events', EventSchema);
const Event = require('../models/events');

//for file uploads and downloads
var formidable = require('formidable');
const fileslocation = "./";

class Events {

    findAll(req, res){
        var a = Event.find({"eventId": "1"}).then(function(a){
            console.log(a);
            
            res.send(""+ JSON.stringify(a));

            res.end();
        });
    }
    findInfo(req, res){
        var a = Event.find({"eventId": "1"},{"info": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].info);

            res.end();
        });
    }
    findProgramme(req, res){
        var a = Event.find({"eventId": "1"},{"programme": 1, _id: 0}).then(function(a){
            console.log(a);

            res.send(a[0].programme);

            res.end();
        });
    }
    findMaps(req, res){
        var a = Event.find({"eventId": "1"},{"maps": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].maps);

            res.end();
        });
    }
    findParticipants(req, res){
        var a = Event.find({"eventId": "1"},{"participants": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].participants);

            res.end();
        });
    }
    findVisibility(req, res){
        var a = Event.find({"eventId": "1"},{"eventIdForVisibilityRegardingUser": 1, _id: 0}).then(function(a){
            console.log(a);
            
            res.send(a[0].eventIdForVisibilityRegardingUser);

            res.end();
        });
    }


    getOneFile(req, res){
        var tmpreq=req.url.split("/");
        var filenametmp = fileslocation + tmpreq[tmpreq.length-1];

        var fs=require('fs');
        var filebuf;

        res.setHeader("Content-Type","text/plain");
        try
        {
            
            fs.accessSync(filenametmp,fs.constants.F_OK);
            filebuf=fs.readFileSync(filenametmp,{});
            res.setHeader("Content-Type","image/jpg");
            
        }
        catch(err)
        {filebuf=""}


        //filebuf=fs.readFileSync(filenametmp,{});
        
        //console.log(filebuf);
        res.send(filebuf);
        res.end();
    }
    putOneFile(req, res){

        var fs=require('fs');
        var form = new formidable.IncomingForm();

        //console.log(req);
        form.parse(req, function (err, fields, files) {
        console.log(files.filetoupload.path);
        var newpath = fileslocation + files.filetoupload.name;
        
        fs.rename(files.filetoupload.path,newpath,(err) =>
        {
            if(err)
            {
                res.setHeader("Content-Type","text/plain");
                res.write('File not uploaded and moved!');
            
                res.end();
        
            }
            else
            {
                res.setHeader("Content-Type","text/plain");
                res.write('File uploaded and moved!');
                res.end();
            }
        }
        );

        //res.write('File not uploaded and moved!');
        //res.end();
        //res.setHeader("Content-Type","text/plain");
        //res.send("");

        //res.end();
        });
    }
}


module.exports = Events;

// Alternativa way to use funtions in routes
//module.exports.findAll = function(){
//    var a = Item.find().then(function(a){
//        console.log(a);
//        return 1;
//    });
//}


