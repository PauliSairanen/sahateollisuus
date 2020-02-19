let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'speakers.csv'; 
let fileOutputName = 'speakers.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);