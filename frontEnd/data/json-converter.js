let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'osallistujat.csv'; 
let fileOutputName = 'osallistujat.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);