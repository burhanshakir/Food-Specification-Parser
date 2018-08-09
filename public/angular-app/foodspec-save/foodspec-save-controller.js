angular.module('foodspec').controller('FoodSpecSaveController', FoodSpecSaveController);

function FoodSpecSaveController(foodspecDataFactory,$route,$window,$routeParams){

  var vm = this;

  // Getting data passed by the parser class
  var parsedData = foodspecDataFactory.getFoodspecParseData();

  if(parsedData != null){

    // Setting parsed data to form fields
    vm.foodItem = parsedData;

    // vm.productName = parsedData.ProductName;
    // console.log("Name:", vm.productName);
  }


  vm.saveData = function(foodItem){
    console.log("Saving your foodItem");
    console.log("Temperature:", foodItem.temperature);


    foodspecDataFactory.foodSpecSave(foodItem);
  }


}
