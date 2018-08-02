var express = require('express');
var router = express.Router();

var ctrlParser = require('../controllers/foodSpecParser.controller.js');
var ctrlFoodSpec = require('../controllers/foodSpec.controller.js');

router
  .route('/foodspec-parse')
  .post(ctrlParser.foodSpecParse);

router
  .route('/foodspec')
  .post(ctrlFoodSpec.foodSpecUpload)
  .get(ctrlFoodSpec.foodSpecGetAll);

router
  .route('/foodspec/:id')
  .get(ctrlFoodSpec.foodSpecGetOne);






module.exports = router;
