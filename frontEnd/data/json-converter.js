let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'programme_1.1.csv'; 
let fileOutputName = 'programme.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);