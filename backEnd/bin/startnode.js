const mongoose = require('mongoose');
const express = require('express')
const app = express()
const request = require('http')
//DB CONSTS
const Event = require('../models/events');
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
//mongoose.connect('mongodb://localhost:27017/testdb',{ useNewUrlParser: true }); //local db connection string
mongoose.connect('mongodb://owner:in@localhost:27017/sahateollisuus',{ useNewUrlParser: true });
mongoose.connection.once('open',function(){
    console.log('Connection has been made!');
}).on('error',function(error){
    console.log('Connection error:', error);
});

Event.collection.drop();

var event1 = new Event({
    eventId : "1",
        eventIdForVisibilityRegardingUser : "String",
        info: {
            eventName: "First event",
            titleName: true,
            startTime: "String",
            endTime : "String",
            place: "String",
            image: { data: "String", contentType: "String" },
            eventColor: "String"
        },
        programme: {
          timeTableObject : {
            name : "String",
            startTime : "String", 
            endTime : "String",
            performerName: "String",
            performerTitle : "String",
            date : "String", 
            description : "String"
          }
        },
        maps: { 
            colors: {
              restaurants : "String",
              hotels : "String",
              venue : "String",
            },
            restaurants : {   // Restaurant array needs to have ID for color comparison
              restaurantObject: {
                name : "String",
                address : "String",
                latitude : 12,
                longitude : 12,
              }
            },
            hotels : {
              hotelObject: {
                name : "String",
                address : "String",
                latitude : "String",
                longitude : "String",
              }
            },
            venue: {
              location: {
                name : "String",
                address : "String",
                latitude : "String",
                longitude : "String",
              } 
            }   
        },     
        participants : [
          {
           "FirstName": "Frederasdasdasdasdsdic",
           "LastName": "Boinet",
           "Email": "f.boinet@gmail.com",
           "Phone": "+33607337469",
           "Company": "Agence Boinet",
           "Country": "FR",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Thomas",
           "LastName": "Godard",
           "Email": "tgodard@agibois.com",
           "Phone": "+330671625273",
           "Company": "Agibois",
           "Country": "FR",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Suoma",
           "LastName": "Magnus",
           "Email": "suoma.magnus@ahalogistics.com",
           "Phone": "+358407282174",
           "Company": "AHA Logistics Ltd",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Khaled",
           "LastName": "El-Emma",
           "Email": "",
           "Phone": "",
           "Company": "Al Ashraf Company",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Abdel",
           "LastName": "Salam Ragab",
           "Email": "",
           "Phone": "",
           "Company": "Al Domiaty Co.",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Yahia",
           "LastName": "Saidi",
           "Email": "yahia@alessami.jo",
           "Phone": "+962799745112",
           "Company": "Al Essami Co. for Investment & Trade Ltd.",
           "Country": "JO",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Veera",
           "LastName": "Honkanen",
           "Email": "veera.honkanen@almamedia.fi",
           "Phone": "+358408275549",
           "Company": "Alma Talent / Kauppalehti",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Pasi",
           "LastName": "Martikainen",
           "Email": "pasi.martikainen@arborealis.fi",
           "Phone": "+358405037467",
           "Company": "Arborealis Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Liis",
           "LastName": "Arroval",
           "Email": "liis.arroval@toftan.ee",
           "Phone": "+37256461148",
           "Company": "AS Toftan",
           "Country": "EE",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Merli",
           "LastName": "Randoja",
           "Email": "merli@toftan.ee",
           "Phone": "+3725145667",
           "Company": "AS Toftan",
           "Country": "EE",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Piia",
           "LastName": "Tirkkonen",
           "Email": "piia.tirkkonen@c-shipping.se",
           "Phone": "+358404868670",
           "Company": "AtoBatC Shipping Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Johanna",
           "LastName": "Autio",
           "Email": "johanna.autio@autiomaa.fi",
           "Phone": "+358505442857",
           "Company": "Autiomaa Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Hubert",
           "LastName": "Speth",
           "Email": "hubert.speth@mosbach.dhbw.de",
           "Phone": "+491716998910",
           "Company": "Baden-Wuerttemberg  State University Mosbach",
           "Country": "DE",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Abdulkarim",
           "LastName": "Barake",
           "Email": "a.barake@baltimber.com",
           "Phone": "+3725030333",
           "Company": "Baltimber Ltd",
           "Country": "EE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Morten",
           "LastName": "Bergsten",
           "Email": "morten@bergstentimber.dk",
           "Phone": "+4528100017",
           "Company": "Bergsten Timber A/S",
           "Country": "DK",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Ahmed",
           "LastName": "Fiaz",
           "Email": "fiaz@bfs-forest.com",
           "Phone": "+4917672198008",
           "Company": "BFS Forest Products GmbH",
           "Country": "DE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Timo",
           "LastName": "Kauppila",
           "Email": "timo.kauppila@binderholz.com",
           "Phone": "+358505987972",
           "Company": "Binderholz Nordic",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Olli",
           "LastName": "Torri",
           "Email": "olli.torri@binderholz.com",
           "Phone": "+358405757147",
           "Company": "Binderholz Nordic",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Janne",
           "LastName": "Salonen",
           "Email": "janne.salonen@blomberg.fi",
           "Phone": "",
           "Company": "Blomberg Stevedoring Ab Kalajoki",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Juris",
           "LastName": "Taurins",
           "Email": "juris.taurins@bsw.lv",
           "Phone": "+37129192721",
           "Company": "BSW Latvia Sia",
           "Country": "LV",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Kari",
           "LastName": "Hiltunen",
           "Email": "kari.hiltunen@businessfinland.fi",
           "Phone": "+358504726597",
           "Company": "Business Finland Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Carl Gustaf",
           "LastName": "de Groot",
           "Email": "gustaf@degroothout.nl",
           "Phone": "+31356933604",
           "Company": "C.de Groot Houtagenturen b.v.",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Dennis",
           "LastName": "Rump",
           "Email": "dennisrump@degroothout.nl",
           "Phone": "",
           "Company": "C.de Groot Houtagenturen b.v.",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Timo",
           "LastName": "Karjalainen",
           "Email": "timo.karjalainen@carelianwood.com",
           "Phone": "+34607211731",
           "Company": "Carelian Wood S.L.",
           "Country": "ES",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Giulio",
           "LastName": "Azzalini",
           "Email": "giulio.azzalini@cdlegno.com",
           "Phone": "+3339366540",
           "Company": "COMPAGNIA DEL LEGNO SRL",
           "Country": "IT",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Stefano",
           "LastName": "Ghinassi",
           "Email": "stefano.ghinassi@cdlegno.com",
           "Phone": "+3334741002",
           "Company": "COMPAGNIA DEL LEGNO SRL",
           "Country": "IT",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Rob",
           "LastName": "Driessen",
           "Email": "Rob@connec3.com",
           "Phone": "+31655852185",
           "Company": "Connec3 BV",
           "Country": "NL",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Stephen",
           "LastName": "Sabine",
           "Email": "stephen.sabine@mbmfp.co.uk",
           "Phone": "+7768258280",
           "Company": "Consolidated Timber Holdings",
           "Country": "GB",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Ari",
           "LastName": "Heiskanen",
           "Email": "ari.heiskanen@kolumbus.fi",
           "Phone": "+358400625057",
           "Company": "D-Wood Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Petri",
           "LastName": "Pirinen",
           "Email": "petri.pirinen@dachser.com",
           "Phone": "+358401465777",
           "Company": "Dachser Finland Air & Sea Logistics Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Tiina",
           "LastName": "Ryyppo",
           "Email": "tiina.ryyppo@dachser.com",
           "Phone": "+358444350459",
           "Company": "Dachser Finland Air & Sea Logistics Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Aleksi",
           "LastName": "Manninen",
           "Email": "aleksi.manninen@dbschenker.com",
           "Phone": "+358405089866",
           "Company": "DB Schenker",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Patrik",
           "LastName": "Heikkonen",
           "Email": "patrik.heikkonen@freeco.fi",
           "Phone": "+358407278788",
           "Company": "DFDS Logistics Finland",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Esko",
           "LastName": "Jussila",
           "Email": "esko.jussila@dhl.com",
           "Phone": "+358408381909",
           "Company": "DHL",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Juha",
           "LastName": "Kallunki",
           "Email": "juha.kallunki@dhl.com",
           "Phone": "+358408207699",
           "Company": "DHL",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Jarno",
           "LastName": "Kurtti",
           "Email": "jarno.kurtti@dhl.com",
           "Phone": "+358400835513",
           "Company": "DHL",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Raimonds",
           "LastName": "Cipe",
           "Email": "raimonds.cipe@dizozols.ir",
           "Phone": "+37129439633",
           "Company": "Dizozols",
           "Country": "LV",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Mark",
           "LastName": "Mashreki",
           "Email": "mark@eagletimber.fi",
           "Phone": "+358449724765",
           "Company": "Eagle Timber",
           "Country": "FI",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Saara",
           "LastName": "Laitinen",
           "Email": "saara.laitinen@eagletimber.fi",
           "Phone": "+358504661291",
           "Company": "Eagle Timber Oy",
           "Country": "FI",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Mohamed",
           "LastName": "El-Tawil",
           "Email": "mohamed@eltawil.com",
           "Phone": "+201222138779",
           "Company": "El-Tawil International Trade",
           "Country": "EG",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Youssef",
           "LastName": "Eltawil",
           "Email": "youssef@eltawil.com",
           "Phone": "+201003934500",
           "Company": "El-Tawil International Trade",
           "Country": "EG",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Ibrahim",
           "LastName": "Elshal",
           "Email": "ibrahim.elshal@elshaltimber.com",
           "Phone": "+201222747031",
           "Company": "Elshal Timber",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Madelene",
           "LastName": "Andersson",
           "Email": "madelene.andersson@enar.com",
           "Phone": "+46703223839",
           "Company": "Enar Timber Ab",
           "Country": "SE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Nicklas",
           "LastName": "Jacobsson",
           "Email": "nicklas.jacobsson@enar.com",
           "Phone": "+46707981560",
           "Company": "Enar Timber Ab",
           "Country": "SE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Sampsa",
           "LastName": "Auvinen",
           "Email": "sampsa.auvinen@gmail.com",
           "Phone": "",
           "Company": "EOS",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Silvia",
           "LastName": "Melegari",
           "Email": "silvia.melegari@eos-oes.eu",
           "Phone": "+32492697998",
           "Company": "EOS",
           "Country": "BE",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Steven",
           "LastName": "Depypere",
           "Email": "steven@eth.com.sg",
           "Phone": "+32475954812",
           "Company": "ETH Enterprise Pte Ltd",
           "Country": "SG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Mikko",
           "LastName": "Ahtola",
           "Email": "mikko.ahtola@euroports.fi",
           "Phone": "+358407260987",
           "Company": "Euroports Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Juha",
           "LastName": "Rehmonen",
           "Email": "juha.rehmonen@euroports.fi",
           "Phone": "+358405883035",
           "Company": "Euroports Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Janne",
           "LastName": "Virta",
           "Email": "janne.virta@euroports.fi",
           "Phone": "+358407203335",
           "Company": "Euroports Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Tuomo",
           "LastName": "Neuvonen",
           "Email": "tuomo@fastmarkets.com",
           "Phone": "+358405505809",
           "Company": "Fastmarkets FOEX",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Ihab",
           "LastName": "Elkholi",
           "Email": "ceo@finteca.fi",
           "Phone": "+358466206130",
           "Company": "FINLAND TECHNICAL COLLABORATION OY",
           "Country": "FI",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Anniina",
           "LastName": "Kostilainen",
           "Email": "anniina.kostilainen@sahateollisuus.com",
           "Phone": "+358207790962",
           "Company": "Finnish Sawmills Association",
           "Country": "FI",
           "Icomefrom": "Staff"
          },
          {
           "FirstName": "Kai",
           "LastName": "Merivuori",
           "Email": "kai.merivuori@sahateollisuus.com",
           "Phone": "+358207790961",
           "Company": "Finnish Sawmills Association",
           "Country": "FI",
           "Icomefrom": "Staff"
          },
          {
           "FirstName": "Kari",
           "LastName": "Perttil�",
           "Email": "kari.perttila@sahateollisuus.com",
           "Phone": "+358207790962",
           "Company": "Finnish Sawmills Association",
           "Country": "FI",
           "Icomefrom": "Staff"
          },
          {
           "FirstName": "Raija",
           "LastName": "Suomalainen",
           "Email": "raija.suomalainen@sahateollisuus.com",
           "Phone": "",
           "Company": "Finnish Sawmills Association",
           "Country": "FI",
           "Icomefrom": "Staff"
          },
          {
           "FirstName": "Gilad",
           "LastName": "Mishael",
           "Email": "gil@finnlumber.com",
           "Phone": "+358500503436",
           "Company": "Finnlumber Ltd. Oy",
           "Country": "IL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jonathan",
           "LastName": "Sperling",
           "Email": "jonathan@finnlumber.com",
           "Phone": "+358505016503",
           "Company": "Finnlumber Ltd. Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Gilad",
           "LastName": "Sperling",
           "Email": "gilad@finnlumber.com",
           "Phone": "+358505016500",
           "Company": "Finnlumber Ltd. Oy",
           "Country": "IL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Orkun",
           "LastName": "Yasat",
           "Email": "orkun@finnlumber.com",
           "Phone": "+358408486986",
           "Company": "Finnlumber Ltd. Oy",
           "Country": "TR",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jere",
           "LastName": "Heikkinen",
           "Email": "mari.varpenius@finnos.fi",
           "Phone": "+358443368652",
           "Company": "Finnos Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Mari",
           "LastName": "Varpenius",
           "Email": "mari.varpenius@finnos.fi",
           "Phone": "+3580401532345",
           "Company": "Finnos Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Ahmed",
           "LastName": "Ramadan",
           "Email": "fintimber@yahoo.com",
           "Phone": "+358407553112",
           "Company": "FinTimber Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Ville",
           "LastName": "Nikkanen",
           "Email": "vnikkanen@fisheri.com",
           "Phone": "+358405198749",
           "Company": "Fisher International",
           "Country": " Inc.\"",
           "Icomefrom": "FI"
          },
          {
           "FirstName": "Sami",
           "LastName": "K�h�r�",
           "Email": "sami.kahara@fmtimber.fi",
           "Phone": "+358407614150",
           "Company": "FM Timber Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Mikko",
           "LastName": "Luikku",
           "Email": "mikko.luikku@fmtimber.fi",
           "Phone": "+358400175852",
           "Company": "FM Timber Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Agris",
           "LastName": "Melnis",
           "Email": "agris.melnis@forest2market.com",
           "Phone": "+37126147371",
           "Company": "FOREST2MARKET",
           "Country": "LV",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Jari",
           "LastName": "Ter�v�",
           "Email": "jari.terava@foretra.fi",
           "Phone": "+358505757214",
           "Company": "FORETRA OY",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Pekka",
           "LastName": "Huhtanen",
           "Email": "pekka.huhtanen@fi.fracht.com",
           "Phone": "+358401804558",
           "Company": "FRACHT FINLAND OY Ltd",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kari",
           "LastName": "M�ki",
           "Email": "",
           "Phone": "",
           "Company": "FRACHT FINLAND OY Ltd",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Peter",
           "LastName": "Pagnia",
           "Email": "p.pagnia@georg-pagnia.de",
           "Phone": "+491714194449",
           "Company": "Georg Pagnia GmbH & Co. KG",
           "Country": "DE",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "J�rg",
           "LastName": "Peters",
           "Email": "j.peters@georg-pagnia.de",
           "Phone": "+00491702394513",
           "Company": "Georg Pagnia GmbH & Co. KG",
           "Country": "DE",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Mats",
           "LastName": "Karlsson",
           "Email": "mats.karlsson@gotcha.se",
           "Phone": "+709314251",
           "Company": "Gothenburg Chartering AB",
           "Country": "SE",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Robert",
           "LastName": "Tjeerds",
           "Email": "robert.tjeerds@ne-hout.nl",
           "Phone": "+31622660658",
           "Company": "Gras Wood Wide",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Harry",
           "LastName": "Gras",
           "Email": "h.gras@graswoodwide.com",
           "Phone": "+756163792",
           "Company": "Gras Wood Wide BV",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Petteri",
           "LastName": "Lillstrang",
           "Email": "petteri.lillstrang@gtt.fi",
           "Phone": "+358407195097",
           "Company": "Green timber trading Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Anna",
           "LastName": "Pantsulaia",
           "Email": "anna.pantsulaia@gtt.fi",
           "Phone": "+358403567665",
           "Company": "Green Timber Trading Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jaakko",
           "LastName": "Tuulasvaara",
           "Email": "jaakko.tuulasvaara@gtt.fi",
           "Phone": "+358403502650",
           "Company": "Green Timber Trading Oy Ltd.",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Tapani",
           "LastName": "Roimaa",
           "Email": "tapani.roimaa@greencarrier.com",
           "Phone": "+358443311173",
           "Company": "Greencarrier Liner Agency Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Minna",
           "LastName": "Ruisaho",
           "Email": "minna.ruisaho@greencarrier.com",
           "Phone": "+358405802283",
           "Company": "Greencarrier Liner Agency Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kasperi",
           "LastName": "Pitk�kangas",
           "Email": "kasperi@hasa.fi",
           "Phone": "+358405018417",
           "Company": "Haapaj�rven Ha-Sa Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Bj�rn",
           "LastName": "Palm",
           "Email": "bjorn.palm@hacklin.fi",
           "Phone": "+358407609101",
           "Company": "Hacklin Ltd Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kaj",
           "LastName": "Kuusisto",
           "Email": "kaj.kuusisto@hacklin.fi",
           "Phone": "+358505211167",
           "Company": "Hacklin Port Service Ltd Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Olli",
           "LastName": "Virtanen",
           "Email": "olli.virtanen@hacklin.fi",
           "Phone": "+358505443062",
           "Company": "Hacklin Port Service Ltd Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Niklas",
           "LastName": "B�rlund",
           "Email": "niklas.barlund@hamburgsud.com",
           "Phone": "+358405840445",
           "Company": "Hamburg Sud",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Ryoji",
           "LastName": "Kurosaka",
           "Email": "ryoji.kurosaka@hanwa-europe.nl",
           "Phone": "+436648466236",
           "Company": "Hanwa Europe BV. Vienna Branch",
           "Country": "AT",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Sampo",
           "LastName": "Juhala",
           "Email": "sampo.juhala@hlag.com",
           "Phone": "+358407153707",
           "Company": "Hapag-Lloyd Finland",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Atte",
           "LastName": "Ingman",
           "Email": "atte.ingman@hlag.com",
           "Phone": "+358400911491",
           "Company": "Hapag-LLoyd Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Leo",
           "LastName": "Vapalahti",
           "Email": "leo.vapalahti@hlag.com",
           "Phone": "+358400330662",
           "Company": "Hapag-Lloyd Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kaj",
           "LastName": "Sundholm",
           "Email": "kaj.sundholm@hartman.fi",
           "Phone": "+358500302400",
           "Company": "Hartman Wood",
           "Country": "FI",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Olli",
           "LastName": "Kantola",
           "Email": "Olli.Kantola@hasa.fi",
           "Phone": "+358405309481",
           "Company": "HASA",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jussi",
           "LastName": "Walta",
           "Email": "jussi.walta@hasa.fi",
           "Phone": "+358400947181",
           "Company": "HASA",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Hamdy",
           "LastName": "Algheriany",
           "Email": "hawaswood@gmail.com",
           "Phone": "+201016816721",
           "Company": "HAWAS FOR IMPORT",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Mohamed",
           "LastName": "Rezk",
           "Email": "hawaswood@gmail.com",
           "Phone": "+00201007363007",
           "Company": "HAWAS FOR IMPORT",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Kalle",
           "LastName": "Greis",
           "Email": "kalle.greis@helsinki.fi",
           "Phone": "+358504905892",
           "Company": "Helsingin Yliopisto",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Anni",
           "LastName": "J�rvinen",
           "Email": "annijarvinen_7@hotmail.com",
           "Phone": "+358503072522",
           "Company": "Helsingin yliopisto",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Sara",
           "LastName": "M�h�nen",
           "Email": "sara.mahonen@gmail.com",
           "Phone": "+358504075101",
           "Company": "Helsingin yliopisto",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Eetu",
           "LastName": "Punkka",
           "Email": "eetu.punkka@helsinki.fi",
           "Phone": "+358400709124",
           "Company": "Helsingin yliopisto",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Domna",
           "LastName": "Staff",
           "Email": "domna.staff@helsinki.fi",
           "Phone": "+358456504756",
           "Company": "Helsingin yliopisto",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Viktor",
           "LastName": "Harvio",
           "Email": "viktor.harvio@helsinki.fi",
           "Phone": "+358408408684",
           "Company": "Helsingin yliopisto ",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Jari",
           "LastName": "Erkkil�",
           "Email": "jari.erkkila@hermanandersson.fi",
           "Phone": "+358504087999",
           "Company": "Herman Andersson Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Mikko",
           "LastName": "Valtanen",
           "Email": "mikko.valtanen@hooli.fi",
           "Phone": "+358401683779",
           "Company": "Hooli Stevedoring",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Ari",
           "LastName": "Hooli",
           "Email": "ari.hooli@hooli.fi",
           "Phone": "+358400695518",
           "Company": "Hooli Stevedoring Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Petri",
           "LastName": "H�m�l�inen",
           "Email": "petri.hamalainen@ipowood.fi",
           "Phone": "+358445302221",
           "Company": "Iisalmen Sahat Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Tommy",
           "LastName": "Lindstr�m",
           "Email": "tommy.lindstrom@iisveden.fi",
           "Phone": "+358409007583",
           "Company": "Iisveden Mets� Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jaakko",
           "LastName": "Rantanen",
           "Email": "jaakko.rantanen@induforgroup.com",
           "Phone": "+358405639604",
           "Company": "Indufor Group",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Sherif",
           "LastName": "Tobgi",
           "Email": "stobgi@link.net",
           "Phone": "+201222143549",
           "Company": "Intertimber Oy",
           "Country": "EG",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Esa",
           "LastName": "Hakam�ki",
           "Email": "esa.hakamaki@isojoensaha.fi",
           "Phone": "+358405486040",
           "Company": "Isojoen Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Timo",
           "LastName": "Seilo",
           "Email": "timo@seilo.fi",
           "Phone": "+358500233333",
           "Company": "Isojoen Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Aniita",
           "LastName": "Junnila",
           "Email": "aniita@italotrade.fi",
           "Phone": "+358505622196",
           "Company": "Italotrade Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Henning",
           "LastName": "Reck",
           "Email": "hreck@juergensen.de",
           "Phone": "+494022705298",
           "Company": "Jacob Juergensen Wood GmbH",
           "Country": "DE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Wolfgang",
           "LastName": "Wetzel",
           "Email": "wwetzel@juergensen.de",
           "Phone": "+491736009090",
           "Company": "Jacob J�rgensen Wood GmbH",
           "Country": "DE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Pauli",
           "LastName": "Aaltonen",
           "Email": "pauli.aaltonen@jpj-wood.fi",
           "Phone": "+358408396330",
           "Company": "JPJ-Wood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Marko",
           "LastName": "Lindstedt",
           "Email": "marko.lindstedt@jpj-wood.fi",
           "Phone": "+358503385222",
           "Company": "JPJ-Wood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Markus",
           "LastName": "Luodelahti",
           "Email": "markus.luodelahti@jpj-wood.fi",
           "Phone": "+358505410544",
           "Company": "JPJ-Wood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Veli-Matti",
           "LastName": "Junnikkala",
           "Email": "vm.junnikkala@junnikkala.com",
           "Phone": "+358505583252",
           "Company": "Junnikkala Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jani",
           "LastName": "Ruuskanen",
           "Email": "Jani.Ruuskanen@kaivospuu.fi",
           "Phone": "+358503075571",
           "Company": "Kaivospuu Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Pauli",
           "LastName": "Sarpola",
           "Email": "pauli.sarpola@portofkalajoki.fi",
           "Phone": "+358444691361",
           "Company": "Kalajoen Satama Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Mohamed Asraf",
           "LastName": "Nour el Din",
           "Email": "mohamednour59@gmail.com",
           "Phone": "+358400259793",
           "Company": "Kamal el Din Nour el den Sons Co",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Matti",
           "LastName": "Kyl�vainio",
           "Email": "matti.kylavainio@keitelegroup.fi",
           "Phone": "",
           "Company": "Keitele Timber Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Ari",
           "LastName": "Ronkainen",
           "Email": "ari.ronkainen@keitelegroup.fi",
           "Phone": "",
           "Company": "Keitele Timber Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Suvi ",
           "LastName": "Strandman",
           "Email": "suvi.strandman@keitelegroup.fi",
           "Phone": "",
           "Company": "Keitele Timber Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Juha",
           "LastName": "Timonen",
           "Email": "juha.timonen@keitelegroup.fi",
           "Phone": "",
           "Company": "Keitele Timber Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Mikko",
           "LastName": "Kyl�vainio",
           "Email": "mikko.kylavainio@keitelegroup.fi",
           "Phone": "+358407075111",
           "Company": "Keitele Wood Products Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jukka",
           "LastName": "Turunen",
           "Email": "jukka.turunen@keitelegroup.fi",
           "Phone": "",
           "Company": "Keitele Wood Products Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Herbert-Jan",
           "LastName": "Kentgens",
           "Email": "info@kentgens.nl",
           "Phone": "+31645336411",
           "Company": "Kentgens Houtagenturen BV",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jari",
           "LastName": "Tyynismaa",
           "Email": "jari.tyynismaa@kesko.fi",
           "Phone": "+358401261656",
           "Company": "Kesko Oyj",
           "Country": "FI",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Olli",
           "LastName": "Turunen",
           "Email": "olli.turunen@kieppisawmill.com",
           "Phone": "+358505559811",
           "Company": "Kieppi Sawmill Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Joonas",
           "LastName": "Nenonen",
           "Email": "joonas.nenonen@kinnaskoski.fi",
           "Phone": "+358445426961",
           "Company": "Kinnaskoski Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Antti",
           "LastName": "Korpikallio",
           "Email": "antti.korpikallio@koivu-trading.fi",
           "Phone": "+358405087739",
           "Company": "Koivu-Trading Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Matti",
           "LastName": "Kokkinen",
           "Email": "matti@kokkinen.fi",
           "Phone": "+358400214673",
           "Company": "Kokkinen Consulting",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Erwin",
           "LastName": "Hoetjes",
           "Email": "erwin@kevl.com",
           "Phone": "+31653165844",
           "Company": "Koninklijke Eduard van Leer BV",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Goderd C.",
           "LastName": "Hooft Graafland",
           "Email": "goderd@kevl.com",
           "Phone": "+31206222324",
           "Company": "Koninklijke Eduard van Leer BV",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Tommi",
           "LastName": "Sneck",
           "Email": "tommi.sneck@koskisen.com",
           "Phone": "+358405498218",
           "Company": "Koskisen",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jesse",
           "LastName": "Kuusisto",
           "Email": "jesse.kuusisto@koskisen.com",
           "Phone": "+358405658346",
           "Company": "Koskisen Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Irmeli",
           "LastName": "Pajuniemi",
           "Email": "irmeli.pajuniemi@koskisen.com",
           "Phone": "+447594212",
           "Company": "KOSKISEN OY",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Timo",
           "LastName": "Piispanen",
           "Email": "timo.piispanen@koskisen.com",
           "Phone": "+358405534494",
           "Company": "Koskisen Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jukka",
           "LastName": "Tamminen",
           "Email": "jukka.tamminen@koskisen.com",
           "Phone": "+3580405534214",
           "Company": "Koskisen Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Mika",
           "LastName": "Lehmonen",
           "Email": "mika.lehmonen@koskisen.com",
           "Phone": "+358407793564",
           "Company": "Koskisen Sawn Timber Industry",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Visa",
           "LastName": "Kutvonen",
           "Email": "visa.kutvonen@kotkamills.com",
           "Phone": "+358403648698",
           "Company": "Kotkamills Wood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Ilkka",
           "LastName": "Lindroth",
           "Email": "ilkka.lindroth@kotkamills.com",
           "Phone": "+358503651563",
           "Company": "Kotkamills Wood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Kari",
           "LastName": "Turunen",
           "Email": "k.turunen@ks-gate.fi",
           "Phone": "+358400259793",
           "Company": "KS-Gate Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Matti",
           "LastName": "Sipil�inen",
           "Email": "matti.sipilainen@kuhmo.eu",
           "Phone": "+358505495987",
           "Company": "Kuhmo Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Kim",
           "LastName": "Knuuttila",
           "Email": "kim.knuuttila@student.lab.fi",
           "Phone": "+358440847011",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Jarkko",
           "LastName": "Kojo",
           "Email": "kojo.jarkko@hotmail.com",
           "Phone": "+3580405173798",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Esa",
           "LastName": "Mikkonen",
           "Email": "esa.mikkonen@polartimber.com",
           "Phone": "+358447085161",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Severi",
           "LastName": "Niiranen",
           "Email": "severi.niiranen@student.lab.fi",
           "Phone": "+358453237787",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Sami",
           "LastName": "Parviainen",
           "Email": "sami.parviainen@student.lab.fi",
           "Phone": "+358406537776",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Pauli",
           "LastName": "Sairanen",
           "Email": "pauli.sairanen@student.lab.fi",
           "Phone": "",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Pyry",
           "LastName": "Turunen",
           "Email": "Pyryeetu.turunen@gmail.com",
           "Phone": "+3580329342",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Olli",
           "LastName": "Kiuru",
           "Email": "opa.kiuru@gmail.com",
           "Phone": "+358505253063",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Ilkka",
           "LastName": "Tarvainen",
           "Email": "ilkka.tarvainen@lab.fi",
           "Phone": "",
           "Company": "LAB University of Applied Sciences",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Jyrki",
           "LastName": "Toivanen",
           "Email": "jyrki@landinvest.fi",
           "Phone": "+358400644641",
           "Company": "Landinvest OY",
           "Country": "CI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Henri",
           "LastName": "Nordstr�m",
           "Email": "henri@nordlfs.com",
           "Phone": "+35840 562 8635",
           "Company": "LFS - Lovisa Forwarding & Stevedoring",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Martti",
           "LastName": "Sajama",
           "Email": "martti.sajama@nordlfs.com",
           "Phone": "+358400611451",
           "Company": "LFS - Lovisa Forwarding & Stevedoring",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "George",
           "LastName": "Morcos",
           "Email": "office@lumbrex.se",
           "Phone": "+201222250757",
           "Company": "Lumbrex Handelsbolag",
           "Country": "SE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Susanna",
           "LastName": "Walther",
           "Email": "susanna.walther@lunawood.com",
           "Phone": "+358407713541",
           "Company": "Lunawood",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Arto ",
           "LastName": "Halonen",
           "Email": "arto.halonen@lunawood.com",
           "Phone": "+358408232877",
           "Company": "Lunawood Ltd. Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Maija",
           "LastName": "Masalin",
           "Email": "maija.masalin@lunawood.com",
           "Phone": "+358408283877",
           "Company": "Lunawood Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Heikki",
           "LastName": "Hippi",
           "Email": "heikki.hippi@luviansaha.fi",
           "Phone": "+358400682196",
           "Company": "Luvian Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Heidi",
           "LastName": "Huhtamaa",
           "Email": "heidi.huhtamaa@hotmail.com",
           "Phone": "+358500535961",
           "Company": "Luvian Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Hanna",
           "LastName": "Penttala",
           "Email": "hanna.penttala@luviansaha.fi",
           "Phone": "+358505988783",
           "Company": "Luvian Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Veli-Matti",
           "LastName": "Puuska",
           "Email": "veli-matti.puuska@luviansaha.fi",
           "Phone": "+358505224795",
           "Company": "Luvian Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Mikko",
           "LastName": "Vuori",
           "Email": "mikko.vuori@luviansaha.fi",
           "Phone": "+358447430459",
           "Company": "Luvian saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Anton",
           "LastName": "Holm",
           "Email": "anton.holm@rauanheimo.com",
           "Phone": "+358505919185",
           "Company": "M. Rauanheimo Oy Ab",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Seppo",
           "LastName": "Vehkaoja",
           "Email": "seppo.vehkaoja@rauanheimo.com",
           "Phone": "+358449729432",
           "Company": "M. Rauanheimo Oy Ab",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Tommi ",
           "LastName": "Sievers",
           "Email": "",
           "Phone": "",
           "Company": "M. Rauanheimo Oy Ab",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Talal",
           "LastName": "Zaitoun",
           "Email": "talal_zaitoun@hotmail.com",
           "Phone": "+966502516234",
           "Company": "Mabani al jazeera Al arabia building",
           "Country": "SA",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Abdullah",
           "LastName": "Almalky",
           "Email": "talal_zaitoun@hotmail.com",
           "Phone": "+966555597686",
           "Company": "Mabani al jazeera Al arabia building",
           "Country": "SA",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Mohamed",
           "LastName": "Elmaghraby",
           "Email": "info@norgad.com",
           "Phone": "+37127145331",
           "Company": "MAGYAD AB",
           "Country": "SE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Reima",
           "LastName": "Sutinen",
           "Email": "reima.sutinen@tem.fi",
           "Phone": "",
           "Company": "MEAE",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Saku",
           "LastName": "P�nk�l�inen",
           "Email": "saku.pankalainen@metsagroup.com",
           "Phone": "+358407648503",
           "Company": "Mets� Fibre",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Heikki",
           "LastName": "K��ri�inen",
           "Email": "heikki.kaariainen@metsa.fi",
           "Phone": "+358400344685",
           "Company": "Mets�hallitus Mets�talous Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Jussi",
           "LastName": "Kumpula",
           "Email": "jussi.kumpula@metsa.fi",
           "Phone": "+358400388614",
           "Company": "Mets�hallitus Mets�talous Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Mikko",
           "LastName": "H�yrynen",
           "Email": "mikko.hayrynen@metsalehti.fi",
           "Phone": "+358400973457",
           "Company": "Mets�lehti",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Ilari",
           "LastName": "Pirttil�",
           "Email": "ilari.pirttila@mmsaatio.fi",
           "Phone": "+358505989920",
           "Company": "Mets�miesten S��ti�",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Heikki",
           "LastName": "K�hk�nen",
           "Email": "heikki.kahkonen@metsantuottajat.fi",
           "Phone": "+358504408227",
           "Company": "Mets�ntuottajat Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Pekka",
           "LastName": "Sainio",
           "Email": "pekka.sainio@metsantuottajat.fi",
           "Phone": "+358409007584",
           "Company": "Mets�ntuottajat Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Kirsi",
           "LastName": "Joensuu",
           "Email": "kirsi.joensuu@smy.fi",
           "Phone": "+358408400642",
           "Company": "Mets�viestint� Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Petri",
           "LastName": "Heino",
           "Email": "petri.heino@ym.fi",
           "Phone": "+358505949923",
           "Company": "Ministry of the Environment",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Thorsten",
           "LastName": "B�r",
           "Email": "thorsten.bar@moelven.com",
           "Phone": "+491743225180",
           "Company": "Moelven Deutschland GmbH",
           "Country": "DE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Tuomas",
           "LastName": "Jaakonsaari",
           "Email": "tuomas.jaakonsaari@mohywood.fi",
           "Phone": "+358400499800",
           "Company": "MOHYWOOD LTD OY",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Mohamed",
           "LastName": "Mohy",
           "Email": "mohamed.mohy@mohywood.fi",
           "Phone": "+201116655536",
           "Company": "MOHYWOOD LTD OY",
           "Country": "EG",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Mahmoud",
           "LastName": "Gado",
           "Email": "",
           "Phone": "",
           "Company": "Mousa Gado for Import",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Sari",
           "LastName": "Koivuneva",
           "Email": "sari.koivuneva@msc.com",
           "Phone": "+358456578355",
           "Company": "MSC Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Hanne",
           "LastName": "Salo",
           "Email": "hanne.salo@msc.com",
           "Phone": "+358404501781",
           "Company": "MSC Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Noora",
           "LastName": "Tanskanen",
           "Email": "noora.tanskanen@msc.com",
           "Phone": "+358414374561",
           "Company": "MSC Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Mira",
           "LastName": "Vuorensola",
           "Email": "mira.vuorensola@msc.com",
           "Phone": "+358407153144",
           "Company": "MSC Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kalle",
           "LastName": "Karttunen",
           "Email": "kalle.karttunen@mtk.fi",
           "Phone": "+358443739377",
           "Company": "MTK",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Juha",
           "LastName": "Hakkarainen",
           "Email": "juha.hakkarainen@mtk.fi",
           "Phone": "+358400870867",
           "Company": "MTK ry",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Mikko",
           "LastName": "Tiirola",
           "Email": "mikko.tiirola@mtk.fi",
           "Phone": "+358445384280",
           "Company": "MTK ry",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Heikki",
           "LastName": "Nuoranne",
           "Email": "heikki@multian.fi",
           "Phone": "+358445963224",
           "Company": "Multian Saha Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Rainar",
           "LastName": "Laagus",
           "Email": "rainar@nasondavis.ee",
           "Phone": "+3725185452",
           "Company": "Nason Davis Eesti O�",
           "Country": "EE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "David",
           "LastName": "Balch",
           "Email": "david.balch@nasondavis.com",
           "Phone": "+447879672244",
           "Company": "Nason Davis Ltd",
           "Country": "GB",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Chris",
           "LastName": "James",
           "Email": "chris.james@nasondavis.com",
           "Phone": "+447860799382",
           "Company": "Nason Davis Ltd",
           "Country": "GB",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Erkki",
           "LastName": "Verkasalo",
           "Email": "erkki.verkasalo@luke.fi",
           "Phone": "+358503913020",
           "Company": "Natural Resources Institute Finland LUKE",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Levecke",
           "LastName": "Tony",
           "Email": "info@nordictimber.be",
           "Phone": "+475277154",
           "Company": "Nordic Timber",
           "Country": "BE",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Fredrik",
           "LastName": "Hahne",
           "Email": "fredrik.hahne@nordictimberline.se",
           "Phone": "+46708191995",
           "Company": "Nordic Timber Line AB",
           "Country": "SE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Aleksi",
           "LastName": "Nurmi",
           "Email": "aleksi.nurmi@nordpine.fi",
           "Phone": "+407480888",
           "Company": "Nordpine Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "P�l ",
           "LastName": "B�haugen",
           "Email": "paal@norlat.com",
           "Phone": "+4795191225",
           "Company": "Norlat Shipping Ltd AS",
           "Country": "NO",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Petri",
           "LastName": "Naumanen",
           "Email": "petri.naumanen@norwoodtimber.fi",
           "Phone": "+358415077300",
           "Company": "Norwood Timber Ltd Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Kari",
           "LastName": "Naumanen",
           "Email": "kari.naumanen@norwoodtimber.fi",
           "Phone": "+358400408910",
           "Company": "Norwood Timber Ltd Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jukka",
           "LastName": "Limingoja",
           "Email": "jukka.limingoja@ntgairocean.com",
           "Phone": "+3584058601137",
           "Company": "NTG Air & Ocean Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Henri",
           "LastName": "Silventoinen",
           "Email": "henri.silventoinen@ntgairocean.com",
           "Phone": "+358503383067",
           "Company": "NTG Air & Ocean Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Alina",
           "LastName": "Bogdanova",
           "Email": "",
           "Phone": "",
           "Company": "OC Lines Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Vera",
           "LastName": "Kiuru",
           "Email": "",
           "Phone": "",
           "Company": "OC Lines Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Evgenia",
           "LastName": "Savina",
           "Email": "evgenia.savina@oc-lines.com",
           "Phone": "+358401531233",
           "Company": "OC Lines Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Mika",
           "LastName": "Tiitinen",
           "Email": "mika.tiitinen@one-line.com",
           "Phone": "+358505817307",
           "Company": "Ocean Network Express",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Jarmo",
           "LastName": "Kaihlam�ki",
           "Email": "jarmo.kaihlamaki@one-line.com",
           "Phone": "+358405070702",
           "Company": "Ocean Network Express ( Europe) LTD  ",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Petrus",
           "LastName": "Berg",
           "Email": "bergpetrus@gmail.com",
           "Phone": "+358400457241",
           "Company": "PB",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Matti",
           "LastName": "Valonen",
           "Email": "matti.valonen@ptt.fi",
           "Phone": "+358041648151",
           "Company": "Pellervo Economic Research",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Ercan",
           "LastName": "Topcu",
           "Email": "ercantopcu@perichem.com",
           "Phone": "+358413192792",
           "Company": "Perichem Trading Inc.",
           "Country": "CA",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Erkki",
           "LastName": "Oksanen",
           "Email": "erkki.oksanen@elisanet.fi",
           "Phone": "+358401765314",
           "Company": "Photographer",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Mena mourad Demian",
           "LastName": "Mena",
           "Email": "mena.demian@platimber.com",
           "Phone": "+21223546880",
           "Company": "Platinum Timber",
           "Country": "AE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Juha",
           "LastName": "M�kinen",
           "Email": "juha.makinen@bcw-global.com",
           "Phone": "+358405709307",
           "Company": "Pohjoisranta bcw",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Alex",
           "LastName": "McIntyre",
           "Email": "alex.mcintyre@polartimber.com",
           "Phone": "+447532667166",
           "Company": "Polar Timber Ltd",
           "Country": "GB",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Annamaija",
           "LastName": "Mikkonen",
           "Email": "anna.mikkonen@polartimber.com",
           "Phone": "+447796 482535",
           "Company": "Polar Timber Ltd",
           "Country": "GB",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Pasi",
           "LastName": "Aro",
           "Email": "pasi.aro@portofpori.fi",
           "Phone": "+358505259053",
           "Company": "Porin Satama Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Pekka",
           "LastName": "Friman",
           "Email": "pekka.friman@portofpori.fi",
           "Phone": "",
           "Company": "Porin Satama Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Markus",
           "LastName": "Helminen",
           "Email": "",
           "Phone": "",
           "Company": "Porin Satama Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Jukka",
           "LastName": "Kallio",
           "Email": "jukka.kallio@portofhelsinki.fi",
           "Phone": "+358403504026",
           "Company": "Port of Helsinki Ltd",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Petri",
           "LastName": "Nikupeteri",
           "Email": "petri.nikupeteri@portofkalajoki.fi",
           "Phone": "+358444691358",
           "Company": "Port of Kalajoki",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Juha",
           "LastName": "Hakala",
           "Email": "juha.hakala@portofpietarsaari.fi",
           "Phone": "+358405852332",
           "Company": "Port of Pietarsaari Ltd",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kaarlo",
           "LastName": "Heikkinen",
           "Email": "kaarlo.heikkinen@raahe.fi",
           "Phone": "+358444393930",
           "Company": "Port of Raahe Ltd.",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Joni",
           "LastName": "Nousiainen",
           "Email": "joni.nousiainen@primatimber.fi",
           "Phone": "+358400355445",
           "Company": "PrimaTimber Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Jussi",
           "LastName": "Joensuu",
           "Email": "jussi.joensuu@profor.fi",
           "Phone": "+358400301133",
           "Company": "ProFor Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Petri",
           "LastName": "Puttonen",
           "Email": "petri.puttonen@puumies.fi",
           "Phone": "+358401633563",
           "Company": "Puumies-lehti",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Hannu",
           "LastName": "Peltonen",
           "Email": "hannu.peltonen10@gmail.com",
           "Phone": "+358500325325",
           "Company": "Puumiesten Ammattikasvatuss��ti�",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Aki",
           "LastName": "Aikio",
           "Email": "aki.aikio@polkky.fi",
           "Phone": "+358407301475",
           "Company": "P�lkky Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Ilkka",
           "LastName": "Help",
           "Email": "ihelp@gmail.com",
           "Phone": "+358505515496",
           "Company": "P�lkky Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Ville",
           "LastName": "Liimola",
           "Email": "ville.liimola@sca.com",
           "Phone": "+358505516610",
           "Company": "P�lkky Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Juha",
           "LastName": "Partanen",
           "Email": "juha.partanen@polkky.fi",
           "Phone": "+358407517335",
           "Company": "P�lkky Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Petteri",
           "LastName": "Virranniemi",
           "Email": "petteri.virranniemi@polkky.fi",
           "Phone": "+358405224390",
           "Company": "P�lkky Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jaakko",
           "LastName": "Virranniemi",
           "Email": "jaakko.virranniemi@polkky.fi",
           "Phone": "+3587018024",
           "Company": "P�lkky Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Kaupo",
           "LastName": "Kraus",
           "Email": "kaupo.kraus@raitwood.ee",
           "Phone": "+3725165661",
           "Company": "RAIT AS",
           "Country": "EE",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Ivar",
           "LastName": "Dembovski",
           "Email": "ivar.dembovski@raitwood.ee",
           "Phone": "+3725056765",
           "Company": "RAITWOOD",
           "Country": "EE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Rainar",
           "LastName": "Laes",
           "Email": "rainar@raitwood.ee",
           "Phone": "+3725180015",
           "Company": "RAITWOOD",
           "Country": "EE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Katja",
           "LastName": "Kujala",
           "Email": "katja.kujala@portofrauma.com",
           "Phone": "+358505520059",
           "Company": "Rauman Satama Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Hannu",
           "LastName": "Asumalahti",
           "Email": "",
           "Phone": "",
           "Company": "Rauman Satama Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Krister",
           "LastName": "Ekl�f",
           "Email": "krister.eklof@rekowood.fi",
           "Phone": "+358400874009",
           "Company": "REKOWOOD Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Martin",
           "LastName": "Hermansson",
           "Email": "mhermansson@rfic.se",
           "Phone": "+79859219232",
           "Company": "RFI Consortium ",
           "Country": "SE",
           "Icomefrom": "Sponsor"
          },
          {
           "FirstName": "Thomas",
           "LastName": "Schmid",
           "Email": "thomas.schmid@th-rosenheim.de",
           "Phone": "+4980318052760",
           "Company": "Rosenheim Technical University of Appl.",
           "Country": "DE",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Heli",
           "LastName": "Dromberg",
           "Email": "heli.dromberg@rpgoup.fi",
           "Phone": "+358400991210",
           "Company": "RP Group",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Petri",
           "LastName": "Lempi�inen",
           "Email": "petri.lempiainen@rpgroup.fi",
           "Phone": "+358405537640",
           "Company": "RP Group",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Sanna",
           "LastName": "Selenius",
           "Email": "sanna.selenius@rpgroup.fi",
           "Phone": "+358400490610",
           "Company": "RP Group",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Jan",
           "LastName": "van den Wildenberg",
           "Email": "jan.wildenberg@rpgroup.fi",
           "Phone": "+358400815214",
           "Company": "RP Group",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Cliff",
           "LastName": "Humphreys",
           "Email": "cliff@sabretimber.co.uk",
           "Phone": "+07812030001",
           "Company": "Sabre Timber Ltd",
           "Country": "GB",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Niko",
           "LastName": "Suomalainen",
           "Email": "niko.suomalainen@sahakuutio.fi",
           "Phone": "+358500789517",
           "Company": "Sahakuutio Oy / Kaivospuu Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Berger",
           "LastName": "Guenter",
           "Email": "guenter.berger@fh-salzburg.ac.at",
           "Phone": "+4369981816967",
           "Company": "Salzburg University of Applied Sciences",
           "Country": "AT",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Sameh",
           "LastName": "Kamel",
           "Email": "",
           "Phone": "",
           "Company": "Sameh Kamel for Import",
           "Country": "EG",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Ville",
           "LastName": "Korhonen",
           "Email": "ville.korhonen@sapinus.fi",
           "Phone": "+358405541417",
           "Company": "Sapinus Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Timo",
           "LastName": "Laine",
           "Email": "timo.laine@sapinus.fi",
           "Phone": "+358405536150",
           "Company": "Sapinus Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Raffaele",
           "LastName": "Parlato",
           "Email": "raffaele.parlato@sca.com",
           "Phone": "+393487004327",
           "Company": "SCA WOOD AB",
           "Country": "SE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Nicholas",
           "LastName": "Sitaras",
           "Email": "nicholas.sitaras@sca.com",
           "Phone": "+302106230566",
           "Company": "SCA Wood AB",
           "Country": "SE",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jarmo",
           "LastName": "Kalliom�ki",
           "Email": "jaka@scangl.com",
           "Phone": "+358407665382",
           "Company": "Scan Global Logistics (Finland) Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Katriina",
           "LastName": "Kilappa",
           "Email": "kkil@scangl.com",
           "Phone": "+358400820924",
           "Company": "Scan Global Logistics Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Juha-Pekka",
           "LastName": "Nuutinen",
           "Email": "jpn@scangl.com",
           "Phone": "+358409015409",
           "Company": "Scan Global Logistics Finland Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Patrik",
           "LastName": "Patriksson",
           "Email": "patrik@scandchart.com",
           "Phone": "+46762132299",
           "Company": "Scandinavian Chartering AB",
           "Country": "SE",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Niels",
           "LastName": "Peltenburg",
           "Email": "agent@scantimber.eu",
           "Phone": "+31646362686",
           "Company": "Scantimber BV",
           "Country": "NL",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Petri",
           "LastName": "Koivisto",
           "Email": "petri.koivisto@dbschenker.com",
           "Phone": "+358407260122",
           "Company": "Schenker Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Jussi",
           "LastName": "Sinkkonen",
           "Email": "juhani.sinkkonen@seachart.fi",
           "Phone": "+358400703669",
           "Company": "Seachart Oy Ltd",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Mika",
           "LastName": "Sinkkonen",
           "Email": "mika.sinkkonen@seachart.fi",
           "Phone": "+3585035895223",
           "Company": "Seachart Oy Ltd",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Erhard",
           "LastName": "Sieder",
           "Email": "erhard@sieder-holz.at",
           "Phone": "+436642418908",
           "Company": "Sieder Holz",
           "Country": "AT",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jari",
           "LastName": "Nurmi",
           "Email": "jari.nurmi@silenus.fi",
           "Phone": "+358405167904",
           "Company": "Silenus Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Mika",
           "LastName": "Lenkkeri",
           "Email": "mika.lenkkeri@slrline.fi",
           "Phone": "+358445095010",
           "Company": "SLR Line Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Arkadiusz",
           "LastName": "Gronowski",
           "Email": "arkadiusz.gronowski@sodra.pl",
           "Phone": "+48512112926",
           "Company": "Sodra Polska",
           "Country": "PL",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "_ukasz",
           "LastName": "Grossmann",
           "Email": "lukasz.grossmann@sodra.pl",
           "Phone": "+48605517888",
           "Company": "Sodra Polska",
           "Country": "PL",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Patrycja",
           "LastName": "Je_yk",
           "Email": "patrycja.jezyk@sodra.pl",
           "Phone": "+48503068479",
           "Company": "Sodra Polska",
           "Country": "PL",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Svyatoslav",
           "LastName": "Dokuchaev",
           "Email": "sd@sterigma.fi",
           "Phone": "+358408458059",
           "Company": "Sterigma OY",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Gleb",
           "LastName": "Sluzhenikin",
           "Email": "gs@sterigma.fi",
           "Phone": "+358415457242",
           "Company": "Sterigma Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Markus",
           "LastName": "Myllyl�",
           "Email": "markus.myllyla@steveco.fi",
           "Phone": "+358442323785",
           "Company": "Steveco Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Sami",
           "LastName": "Orimus",
           "Email": "",
           "Phone": "",
           "Company": "Steveco Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Benjamin",
           "LastName": "Meulyzer",
           "Email": "benjamin@stevenshout.be",
           "Phone": "+32486967340",
           "Company": "Stevens & Co",
           "Country": "BE",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Joachim",
           "LastName": "Bergholtz",
           "Email": "joachim.bergholtz@sttab.org",
           "Phone": "+46733144409",
           "Company": "STT Scandinavian Timber Trade",
           "Country": "SE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Veiko",
           "LastName": "Kobin",
           "Email": "veiko.kobin@nordcloud.ee",
           "Phone": "+3725283854",
           "Company": "Sumitomo Forestry",
           "Country": "JP",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Anna",
           "LastName": "Kauppi",
           "Email": "anna.kauppi@smy.fi",
           "Phone": "+358400702102",
           "Company": "Suomen Mets�yhdistys",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Abdelrahman Mobasher",
           "LastName": "Abdo",
           "Email": "abdo@swefl.se",
           "Phone": "+46708382415",
           "Company": "Swefl timber AB",
           "Country": "SE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Christ",
           "LastName": "Ishoo",
           "Email": "christishoo@gmail.com",
           "Phone": "+46760000882",
           "Company": "Swefl Timber AB",
           "Country": "SE",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Hamish",
           "LastName": "McGrady",
           "Email": "hamish.mcgrady@sylvestra.fi",
           "Phone": "+358406512121",
           "Company": "Sylvestra Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Tomi",
           "LastName": "Liikkanen",
           "Email": "tomi.liikkanen@sodra.com",
           "Phone": "+3580408267884",
           "Company": "S�dra Wood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Andreas",
           "LastName": "Michanickl",
           "Email": "andreas.michanickl@th-rosenheim.de",
           "Phone": "+491752429623",
           "Company": "Technical University  Rosenheim",
           "Country": "DE",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "J�n",
           "LastName": "Sedlia_ik",
           "Email": "sedliacik@tuzvo.sk",
           "Phone": "+421905529073",
           "Company": "Technical University in Zvolen",
           "Country": "SK",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Zuzana",
           "LastName": "Toncikova",
           "Email": "zuzana.toncikova@tuzvo.sk",
           "Phone": "+421915810132",
           "Company": "Technical University in Zvolen",
           "Country": "SK",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Simon",
           "LastName": "Barth",
           "Email": "simon.barth@th-rosenheim.de",
           "Phone": "+4915128264562",
           "Company": "Technical University Rosenheim",
           "Country": "DE",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Ari",
           "LastName": "Martonen",
           "Email": "ari@martonen.fi",
           "Phone": "+35850 2406",
           "Company": "Timber Alliance Ltd./ Martonen Man.",
           "Country": "FI",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Mikael",
           "LastName": "Eliasson",
           "Email": "mikael@timber.exchange",
           "Phone": "+46705648201",
           "Company": "Timber Exchange ",
           "Country": "SE",
           "Icomefrom": "Sponsor"
          },
          {
           "FirstName": "Amir",
           "LastName": "Rashad",
           "Email": "amir@timber.exchange",
           "Phone": "+46700093977",
           "Company": "Timber Exchange ",
           "Country": "SE",
           "Icomefrom": "Sponsor"
          },
          {
           "FirstName": "Ahmed",
           "LastName": "Ahmed",
           "Email": "ahmed.greenwood@gmail.com",
           "Phone": "+358407370027",
           "Company": "Timber Greenwood Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Oona Emilia",
           "LastName": "Gashi",
           "Email": "oona.gashi@gmail.com",
           "Phone": "+358449715359",
           "Company": "Timber Greenwood Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Robin",
           "LastName": "Lillandt",
           "Email": "robin.lillandt@gmail.com",
           "Phone": "+37253097777",
           "Company": "Timber Products Inspection",
           "Country": " Inc.",
           "Icomefrom": "US"
          },
          {
           "FirstName": "Tarek",
           "LastName": "Abdel Dayem",
           "Email": "",
           "Phone": "",
           "Company": "Timbertime Oy Ltd",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Amr",
           "LastName": "Abdel Dayem",
           "Email": "",
           "Phone": "",
           "Company": "Timbertime Oy Ltd",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Antti",
           "LastName": "Vasarinen",
           "Email": "antti.vasarinen@timbertime.fi",
           "Phone": "+358400395204",
           "Company": "Timbertime Oy Ltd",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Jack",
           "LastName": "Vasegaard",
           "Email": "jack@timbuy.dk",
           "Phone": "+4527220066",
           "Company": "Timbuy A/S",
           "Country": "DK",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Joakim",
           "LastName": "Blom",
           "Email": "blomjo@gmail.com",
           "Phone": "+3584573500306",
           "Company": "Totilda Oy Ab",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Kari",
           "LastName": "Kangas",
           "Email": "kari.kangas@unitedbankers.fi",
           "Phone": "+358400903133",
           "Company": "UB Omaisuudenhoito Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Ahmed Abdellatif",
           "LastName": "Ibrahim",
           "Email": "ahmed@unitedgrouptimberimport.com",
           "Phone": "+201111565656",
           "Company": "United Group Timber Import",
           "Country": "EG",
           "Icomefrom": "Buyer"
          },
          {
           "FirstName": "Juha",
           "LastName": "Rikala",
           "Email": "juha.rikala@helsinki.fi",
           "Phone": "+358407274690",
           "Company": "University of Helsinki",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Veera",
           "LastName": "Schildt",
           "Email": "veera.schildt@helsinki.fi",
           "Phone": "+358440612126",
           "Company": "University of Helsinki",
           "Country": "FI",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Laszlo",
           "LastName": "Bejo",
           "Email": "bejo.laszlo@skk.nyme.hu",
           "Phone": "+3699518386",
           "Company": "University of Sopron",
           "Country": "HU",
           "Icomefrom": "Education"
          },
          {
           "FirstName": "Jouni",
           "LastName": "Savolainen",
           "Email": "jouni.savolainen@verbateam.fi",
           "Phone": "+358407410077",
           "Company": "Verbateam Oy",
           "Country": "FI",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Ville",
           "LastName": "Kopra",
           "Email": "ville.kopra@versowood.fi",
           "Phone": "+358500235701",
           "Company": "Versowood Group",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Eetu",
           "LastName": "Eini�",
           "Email": "eetu.einio@versowood.fi",
           "Phone": "+358405534347",
           "Company": "Versowood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Sami",
           "LastName": "Heikkinen",
           "Email": "sami.heikkinen@versowood.fi",
           "Phone": "+358400857748",
           "Company": "Versowood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Eero",
           "LastName": "Valio",
           "Email": "eero.valio@versowood.fi",
           "Phone": "+358400387910",
           "Company": "Versowood Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Pasi",
           "LastName": "Kenola",
           "Email": "pasi.kenola@visionhunters.com",
           "Phone": "+358442136018",
           "Company": "Vision Hunters Oy",
           "Country": "FI",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "J_nis",
           "LastName": "Bu_s",
           "Email": "buls@vmf.lv",
           "Phone": "+37129470949",
           "Company": "VMF LATVIA SIA",
           "Country": "LV",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "M_rti__",
           "LastName": "Gaigals",
           "Email": "martins.gaigals@vmf.lv",
           "Phone": "+37129166096",
           "Company": "VMF LATVIA SIA",
           "Country": "LV",
           "Icomefrom": "Other"
          },
          {
           "FirstName": "Janne",
           "LastName": "Heikkil�",
           "Email": "janne.heikkila@vrtranspoint.fi",
           "Phone": "+358408629401",
           "Company": "VR Transpoint",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Kirsi",
           "LastName": "Lifl�nder",
           "Email": "kirsi.liflander@vrtranspoint.fi",
           "Phone": "+358504334963",
           "Company": "VR Transpoint",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Petri",
           "LastName": "Palo",
           "Email": "petri.palo@vrtranspoint.fi",
           "Phone": "+358447921140",
           "Company": "VR Transpoint Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Antti",
           "LastName": "H�kkinen",
           "Email": "antti.hakkinen@vrtranspoint.fi",
           "Phone": "+358408634883",
           "Company": "VR-Yhtym� Oy",
           "Country": "FI",
           "Icomefrom": "Logistic"
          },
          {
           "FirstName": "Allan",
           "LastName": "Rasmussen",
           "Email": "ara@vti.dk",
           "Phone": "+4596950317",
           "Company": "VTI Vinderup Tr�industri A/S",
           "Country": "DK",
           "Icomefrom": "Importer"
          },
          {
           "FirstName": "Carita",
           "LastName": "Toivola",
           "Email": "carita.toivola@westas.fi",
           "Phone": "+358400725380",
           "Company": "Westas Group",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Arttu",
           "LastName": "Jalas",
           "Email": "arttu.jalas@westas.fi",
           "Phone": "+358447440119",
           "Company": "Westas Group Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Pekka",
           "LastName": "Kopra",
           "Email": "pekka.kopra@westas.fi",
           "Phone": "+358505977245",
           "Company": "Westas Group Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Juha",
           "LastName": "Numminen",
           "Email": "juha.numminen@westas.fi",
           "Phone": "+358447440121",
           "Company": "Westas Group Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Jari",
           "LastName": "Rajakallio",
           "Email": "jari.rajakallio@westas.fi",
           "Phone": "+358447440125",
           "Company": "Westas Group Oy",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Kirsten",
           "LastName": "Breitl�nder",
           "Email": "breitlander@wettergren.de",
           "Phone": "+491795102084",
           "Company": "Wettergren & Co. GmbH",
           "Country": "DE",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Markku",
           "LastName": "Rokkila",
           "Email": "markku.rokkila@sahateollisuus.com",
           "Phone": "+358503667992",
           "Company": "Wood from Finland",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Paolo",
           "LastName": "Mattamira",
           "Email": "paolo@worldwoodservices.it",
           "Phone": "+393486509640",
           "Company": "WorldWoodServices",
           "Country": "IT",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Paolo",
           "LastName": "Milianti",
           "Email": "paolomilianti@worldwoodservices.it",
           "Phone": "+393481207210",
           "Company": "WorldWoodServices S.r.l.",
           "Country": "IT",
           "Icomefrom": "Agent"
          },
          {
           "FirstName": "Anders",
           "LastName": "Mattsson",
           "Email": "anders.mattsson@skogsindustrier.ax",
           "Phone": "+358408461428",
           "Company": "�lands Skogsindustrier Ab",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
           "FirstName": "Daniel",
           "LastName": "Sundblom",
           "Email": "daniel.sundblom@skogsindustrier.ax",
           "Phone": "+3584573500301",
           "Company": "�lands Skogsindustrier Ab",
           "Country": "FI",
           "Icomefrom": "Sawmill"
          },
          {
            "Email": "admin@test"
          }
         ]
        
// Insert to DB
});
event1.save().then(function(){
    console.log("Event was saved");
});



