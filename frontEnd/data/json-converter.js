let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'programme_2020.csv'; 
let fileOutputName = 'programme_2020.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);