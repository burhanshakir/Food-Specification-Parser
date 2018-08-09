angular.module('foodspec').controller('FoodSpecSaveController', FoodSpecSaveController);

function FoodSpecSaveController(foodspecDataFactory,$route,$window,$routeParams){

  var vm = this;

  vm.isDataSaved = false;

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


    foodspecDataFactory.foodSpecSave(foodItem)
    .then(function(response){
      console.log("Response: ", response.data);

      $window.alert("Your data has been stored!");

      vm.isDataSaved = true;
    })
    .catch(function(error){

      console.log("Error saving data: ", error);

    });
  }


  vm.viewProducts = function(){
    console.log("View Products!");

    // Show form for data parsed
    $window.location.href = '/#/foodspecView';
  }


}
