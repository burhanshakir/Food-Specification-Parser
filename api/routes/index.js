var express = require('express');
var router = express.Router();

var ctrlParser = require('../controllers/foodSpecParser.controller.js');
var ctrlAdd = require('../controllers/foodSpecAdd.controller.js');

router
  .route('/foodspec-parse')
  .post(ctrlParser.foodSpecParse);

  router
    .route('/foodspec-upload')
    .post(ctrlAdd.foodSpecUpload);


module.exports = router;
