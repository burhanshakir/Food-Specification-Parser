var formidable = require('formidable'),
    http = require('http'),
    util = require('util');


module.exports.foodSpecParse = function(req, res){
  console.log('Received your file!');

  var form = new formidable.IncomingForm();
  var path = '';
  form.keepExtensions = true; // To save the file as pdf/jpg


  form.on('file', (field, file) => {
    // Do something with the file
    // e.g. save it to the database
    // you can access it using file.path

  });

  // Receiving form data and storing it
  form.parse(req, function(err, fields, files) {

      if(!err){

          console.log('Parsing the form!');
          path = files.file.path;
          console.log('File path:', path);
          var fileType = files.file.type;


          if(fileType === 'application/pdf'){
            console.log('It is a PDF!');
            getDataFromPdf(path, res);
          }
          return


        }

        else {
          console.log("Error parsing form:", err);
        }

      });
}

var getDataFromPdf = function(path, response){

  console.log('Parsing your pdf file!')

  let fs = require('fs'),
        PDFParser = require("pdf2json");

    let pdfParser = new PDFParser();

    //On error of parsing pdf
    pdfParser.on("pdfParser_dataError", errData => {
      console.error(errData.parserError);

      response.status(400)
              .json({"message" : "Unable to parse the pdf"});

    });

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
            texts.push(decodeURIComponent(pdfData.formImage.Pages[i].Texts[j].R[0].T).toLowerCase().trim().replace(/[^a-zA-Z0-9./ ]/g, ""));
          }
        }

        // Parsing data and storing it
        var result = getSpecifications(texts);

        console.log("Result : ",result);

        response.status(200)
                .json(JSON.parse(result));

      });

    pdfParser.loadPDF(path);
}

var getSpecifications = function(texts){

    var productNameKey, productName, productDesc, productWeight, productIngredients,temperature, energy, fat, saturates, monounsaturates, carbohydrates, trans, sugars, polyols, starch, fibre, protein, salt, sodium = "";


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

    productName = texts[texts.indexOf(productNameKey) + 1];
    console.log("Product Name : ", productName);

    productDesc = texts[texts.indexOf("product description") + 1];
    console.log("Product Description :", productDesc);

    productWeight = texts[texts.indexOf("product weight") + 1];
    console.log("Product Weight :", productWeight);


    // Using loops to find text nearer to each food property
    for(var i = 1; i <= 40; i++){

      productIngredients = productIngredients + texts[texts.indexOf("ingredients") + i];
      // console.log("Product Ingredients :", productIngredients);

    }


    if(texts.indexOf("temperature") > -1){
      temperature = texts[texts.indexOf("temperature") + 1];
      console.log("Product Temperature :", temperature);

    }


    energy = texts[texts.indexOf("energy") + 1];
    console.log("Energy :", energy);

    fat = texts[texts.indexOf("fat") + 1];
    console.log("Fat :", fat);


    if(texts.indexOf("saturates") > -1){
      saturates = texts[texts.indexOf("saturates") + 1];
      console.log("Saturates :", saturates);

    }


    if(texts.indexOf("monounsaturates") > -1){
      monounsaturates = texts[texts.indexOf("monounsaturates") + 1];
      console.log("monounsaturates :", monounsaturates);

    }

    if(texts.indexOf("trans fat") > -1){
      trans = texts[texts.indexOf("trans fat") + 1];
      console.log("trans fat :", trans);

    }

    if(texts.indexOf("carbohydrate") > -1){
      carbohydrates = texts[texts.indexOf("carbohydrate") + 1];
      console.log("carbohydrates:", carbohydrates);

    }

    if(texts.indexOf("sugars") > -1){
      sugars = texts[texts.indexOf("sugars") + 1];
      console.log("sugars:", sugars);

    }

    if(texts.indexOf("polyols") > -1){
      polyols = texts[texts.indexOf("polyols") + 1];
      console.log("polyols:", polyols);

    }

    if(texts.indexOf("starch") > -1){
      starch = texts[texts.indexOf("starch") + 1];
      console.log("starch:", starch);

    }

    if(texts.indexOf("fibre") > -1){
      fibre = texts[texts.indexOf("fibre") + 1];
      console.log("fibre:", fibre);

    }

    if(texts.indexOf("protein") > -1){
      protein = texts[texts.indexOf("protein") + 1];
      console.log("protein:", starch);

    }

    if(texts.indexOf("salt") > -1){
      salt = texts[texts.indexOf("salt") + 1];
      console.log("salt:", salt);

    }

    if(texts.indexOf("sodium") > -1){
      sodium = texts[texts.indexOf("sodium") + 1];
      console.log("sodium:", sodium);

    }

    return '{ "ProductName":"' + productName +  '", "ProductDesc":"'+ productDesc + '" }'
}
