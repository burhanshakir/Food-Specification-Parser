var formidable = require('formidable'),
    http = require('http'),
    util = require('util');


module.exports.foodAddAll = function(req, res){
  console.log('Received your file!');

  var form = new formidable.IncomingForm();
  var path = '';
  form.keepExtensions = true; // To save the file as pdf/jpg

  // Receiving form data and storing it
  form.parse(req, function(err, fields, files) {
      res.writeHead(200, {'content-type': 'text/plain'});
      res.write('received upload:\n\n');
      res.end(util.inspect({fields: fields, files: files}));


      path = files.file.path;
      var fileType = files.file.type;


      if(fileType === 'application/pdf'){
        console.log('It is a PDF!');
        getDataFromPdf(path);
      }
      return
    });
}

var getDataFromPdf = function(path){

  console.log('Parsing your pdf file!')

  let fs = require('fs'),
        PDFParser = require("pdf2json");

    let pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );

    pdfParser.on("pdfParser_dataReady", pdfData => {
        // fs.writeFile("./pdf2json/test/F1040EZ.json", JSON.stringify(pdfData));
        console.log(pdfParser.getRawTextContent());
    });

    pdfParser.loadPDF(path);



}
