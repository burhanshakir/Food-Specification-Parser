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

    //On error of parsing pdf
    pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError) );

    //On success of parsing pdf
    pdfParser.on("pdfParser_dataReady", pdfData => {

        // console.log(JSON.stringify(pdfData));

        var pdf2json = JSON.stringify(pdfData);

        var texts = [];

        console.log("Number of pages : " , pdfData.formImage.Pages.length);

        // Going through the pdf json and extracting texts
        for(var i = 0; i < pdfData.formImage.Pages.length; i++){

          for(var j = 0; j < pdfData.formImage.Pages[i].Texts.length; j++){

            // Cleaning up each text line to remove redundant/useless characters
            texts.push(decodeURIComponent(pdfData.formImage.Pages[i].Texts[j].R[0].T).toLowerCase().trim().replace(/[^a-zA-Z0-9. ]/g, ""));
          }
        }

        // for(var i = 1; i <= 5; i++){
        //   console.log("Product Name:",texts[texts.indexOf("product name") + i]);
        //   console.log("Product Description:",texts[texts.indexOf("product description") + i]);
        //   console.log("Product Weight:",texts[texts.indexOf("product weight") + i]);
        //   console.log("Product Ingredients:",texts[texts.indexOf("ingredients") + i]);
        //   console.log("Product Temperature:",texts[texts.indexOf("oC")]);
        //   console.log("Energy:",texts[texts.indexOf("energy") + i]);
        //   console.log("Fat:",texts[texts.indexOf("fat") + i]);
        //   console.log("Saturates:",texts[texts.indexOf("saturates") + i]);
        //   console.log("Monounsaturates:",texts[texts.indexOf("monounsaturates") + i]);
        //   console.log("Trans Fats:",texts[texts.indexOf("trans fats") + i]);
        //   console.log("Carbohydrates:",texts[texts.indexOf("carbohydrates") + i]);
        //   console.log("Sugars:",texts[texts.indexOf("sugars") + i]);
        //   console.log("Polyols:",texts[texts.indexOf("polyols") + i]);
        //   console.log("Starch:",texts[texts.indexOf("starch") + i]);
        //   console.log("Fibre:",texts[texts.indexOf("fibre") + i]);
        //   console.log("Protein:",texts[texts.indexOf("protein") + i]);
        //   console.log("Salt:",texts[texts.indexOf("salt") + i]);
        //   console.log("Sodium:",texts[texts.indexOf("sodium") + i]);
        // }

        getSpecifications(texts);



    });

    pdfParser.loadPDF(path);
}

var getSpecifications = function(texts){

    var productNameKey, productName = "";


    // Finding the key name to extract the product name
    if(texts.indexOf("product name") != -1){
        productNameKey = "product name";
    }
    else if(texts.indexOf("product title") != -1){
      productNameKey = "product title";
    }
    else{
      console.log("No Product Name found");
    }

    // Using loops to find text nearer to each food property
    // for(var i = 1; i <= 5; i++){
    //
    // }

    productName = texts[texts.indexOf(productNameKey) + 1];
    console.log("Product Name : ", productName);

    var productDesc = texts[texts.indexOf("product description") + 1];
    console.log("Product Description :", productDesc);

    var productWeight = texts[texts.indexOf("product weight") + 1];
    console.log("Product Weight :", productWeight);


    // Using loops to find text nearer to each food property
    for(var i = 1; i <= 40; i++){

      var productIngredients = texts[texts.indexOf("ingredients") + i];
      console.log("Product Ingredients :", productIngredients);

    }


    if(texts.indexOf("temperature") > -1){
      var temperature = texts[texts.indexOf("temperature") + 1];
      console.log("Product Temperature :", temperature);

    }


    var energy = texts[texts.indexOf("energy") + 1];
    console.log("Energy :", energy);

    var fat = texts[texts.indexOf("fat") + 1];
    console.log("Fat :", fat);


    if(texts.indexOf("saturates") > -1){
      var saturates = texts[texts.indexOf("saturates") + 1];
      console.log("Saturates :", saturates);

    }


    if(texts.indexOf("monounsaturates") > -1){
      var monounsaturates = texts[texts.indexOf("monounsaturates") + 1];
      console.log("monounsaturates :", monounsaturates);

    }

    if(texts.indexOf("trans fat") > -1){
      var trans = texts[texts.indexOf("trans fat") + 1];
      console.log("trans fat :", trans);

    }

    if(texts.indexOf("carbohydrate") > -1){
      var carbohydrates = texts[texts.indexOf("carbohydrate") + 1];
      console.log("carbohydrates:", carbohydrates);

    }

    if(texts.indexOf("sugars") > -1){
      var sugars = texts[texts.indexOf("sugars") + 1];
      console.log("sugars:", sugars);

    }

    if(texts.indexOf("polyols") > -1){
      var polyols = texts[texts.indexOf("polyols") + 1];
      console.log("polyols:", polyols);

    }

    if(texts.indexOf("starch") > -1){
      var starch = texts[texts.indexOf("starch") + 1];
      console.log("starch:", starch);

    }

    if(texts.indexOf("fibre") > -1){
      var fibre = texts[texts.indexOf("fibre") + 1];
      console.log("fibre:", fibre);

    }

    if(texts.indexOf("protein") > -1){
      var protein = texts[texts.indexOf("protein") + 1];
      console.log("protein:", starch);

    }

    if(texts.indexOf("salt") > -1){
      var salt = texts[texts.indexOf("salt") + 1];
      console.log("salt:", salt);

    }

    if(texts.indexOf("sodium") > -1){
      var sodium = texts[texts.indexOf("sodium") + 1];
      console.log("sodium:", sodium);

    }








}
