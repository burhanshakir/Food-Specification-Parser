var express = require('express');
var router = express.Router();

var ctrlParser = require('../controllers/foodSpecParser.controller.js');

router
  .route('/foodspec')
  .post(ctrlParser.foodAddAll);


module.exports = router;
