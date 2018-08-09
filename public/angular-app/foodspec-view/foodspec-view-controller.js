angular.module('foodspec').controller('FoodSpecViewController', FoodSpecViewController);

function FoodSpecViewController(foodspecDataFactory,$route,$window,$routeParams){

  var vm = this;
  var response = null;

  foodspecDataFactory.getFoodItems().then(function(response) {

    response = response.data;

    if(response != null){
      vm.result = response;
    }

    console.log("Received food items");

 });

  if(response != null){
    vm.result = response;
  }


  vm.getFoodItem = function(id){
    console.log("Selected food item:", id);

    foodspecDataFactory.getFoodItemById(id)
    .then(function(response){
      console.log(response.data);

      vm.foodItem = response.data;
    })
    .catch(function(error){

      console.log("Error saving data: ", error);

    });
  }



}
