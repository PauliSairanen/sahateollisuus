let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'sponsor_Urls.csv'; 
let fileOutputName = 'sponsors_Urls.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);