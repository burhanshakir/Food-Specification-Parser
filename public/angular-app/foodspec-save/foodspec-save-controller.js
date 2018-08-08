angular.module('foodspec').controller('FoodSpecSaveController', FoodSpecSaveController);

function FoodSpecSaveController($route,$window,$routeParams){

  var vm = this;


  vm.productName = "Burhan";
  console.log("Name:", vm.productName);
}
