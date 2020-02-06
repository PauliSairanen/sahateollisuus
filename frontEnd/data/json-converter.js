let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'participants.csv'; 
let fileOutputName = 'participants.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);