const mongoose = require('mongoose');
const EventSchema = require('../models/event');
const config = require('../config/config')
const Event = require('../models/events');
const SortedParticipants = require('../bin/startnode')

//for file uploads and downloads
var formidable = require('formidable');
const fileslocation = "./";

function sortInfo(sorted){



    console.log(sorted);
    return sorted;
}

function sortProgramme(sorted){



    console.log(sorted);
    return sorted;
}

function sortMaps(sorted){



    console.log(sorted);
    return sorted;
}

function sortParticipants(participants){
    let sortedCompanies = [];
    let finalArray = [];
    participants.forEach(participant => {
        if(!sortedCompanies.includes(participant.company)){
            sortedCompanies.push(participant.company)
        }
    });
    sortedCompanies.sort();
    sortedCompanies.forEach(company=>{
        finalArray[company] = []
        participants.forEach(participant=>{
            if(participant.company == company){
                finalArray[company].push({
                
                Name: participant.firstname+" "+participant.lastname,
                Country: participant.country,
                Role: participant.role,
                Telephone: participant.telephone,
                Email: participant.email});
            }
        })
        finalArray[company].sort(function(a, b){
            if(a.Name < b.Name) { return -1; }
            if(a.Name > b.Name) { return 1; }
            return 0;
        });
    });
    return finalArray;
}

class Events {



    findAll(req, res){
        var a = Event.find({"eventId": "1"}).then(function(a){
            console.log(a);
            
            res.send(a);

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
                let muuttuja = sortParticipants(a[0].participants)
                res.send(muuttuja.abc);
                console.log(muuttuja.abc);
                //res.send(a[0].participants);
                //console.log(a[0].participants);
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


