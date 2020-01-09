const mongoose = require('mongoose');
const EventSchema = require('../models/event');
const config = require('../config/config')
const Event = require('../models/events');
const SortedParticipants = require('../bin/startnode')

//for file uploads and downloads
var formidable = require('formidable');
const fileslocation = "./permfiles/";

const maxcachestorage=50;
var cachestorage = [];
//in ms milliseconds
const timeoutcache=3600000;
function cachenow(iden,datain) {
    
    var dataout
    //var tmpref=-1;
    var ii;
    for(ii=0;ii<cachestorage.length;ii++)
    {
        if(cachestorage[ii].iden==iden)
        {
            tmpref=ii;
        
            if(cachestorage[ii].time<(new Date()).getTime() -timeoutcache)
            {

                //dataout = sortingfunc(datain);
                dataout = ("edit:"+datain);
                cachestorage[ii].data=dataout;
                cachestorage[ii].time=(new Date()).getTime();
    
                //console.log("old data, refreshing");
                return dataout;

            }
            //(new Date()).getTime()
            dataout=cachestorage[ii].data;
            //console.log("data is already");

            return dataout;
        }
    } 
    

    ii=cachestorage.length;
    
    if(ii>=maxcachestorage)
    {

        for(ii=1;ii<cachestorage.length;ii++)
        {
            cachestorage[ii-1]=cachestorage[ii];
        }
        ii--
    }
    

    //console.log(ii);
    //console.log(maxcachestorage);

    cachestorage[ii]={};
    cachestorage[ii].iden =iden;
    
    //dataout = sortingfunc(datain);
    dataout = ("edit:"+datain);
    cachestorage[ii].data=dataout;
    cachestorage[ii].time=(new Date()).getTime();
    
    //console.log("data stored into cache");
    return dataout;
}

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
            sortedCompanies.push(participant)
        }
    });
    sortedCompanies.sort(function(a, b){
        if(a.company < b.company) { return -1; }
        if(a.company > b.company) { return 1; }
        return 0;
    });
    sortedCompanies.forEach(company=>{
        if(finalArray[company.company] == undefined){
            finalArray[company.company] = [];
            participants.forEach(participant=>{
                if(participant.company == company.company){
                    finalArray[company.company].push({
                    
                    FirstName: participant.firstname,
                    LastName: participant.lastname,
                    Country: participant.country,
                    Role: participant.role,
                    Telephone: participant.telephone.split(" "),
                    Email: participant.email.split(" ")});
                }
            });
            finalArray[company.company].sort(function(a, b){
                if(a.LastName < b.LastName) { return -1; }
                if(a.LastName > b.LastName) { return 1; }
                return 0;
            });
        }
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
                console.log(muuttuja);
                res.send(muuttuja);
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


