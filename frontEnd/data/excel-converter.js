node_xj = require("xls-to-json");
node_xj({
  input: "sample.xls",  // input xls
  output: "output.json", // output json
  sheet: "sheetname",  // specific sheetname
  rowsToSkip: 5 // number of rows to skip at the top of the sheet; defaults to 0
}, function (err, result) {
  if (err) {
    console.error(err);
  } else {
    console.log(result);
  }
});