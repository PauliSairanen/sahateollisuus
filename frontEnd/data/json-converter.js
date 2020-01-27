let csvToJson = require('convert-csv-to-json');
 
let fileInputName = 'speaker_data_2020.csv'; 
let fileOutputName = 'speakers_2020.json';

csvToJson.fieldDelimiter(',') .getJsonFromCsv(fileInputName)
 
csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);