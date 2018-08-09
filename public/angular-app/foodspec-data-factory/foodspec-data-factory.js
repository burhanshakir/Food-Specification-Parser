angular.module('foodspec').factory('foodspecDataFactory',foodspecDataFactory);

function foodspecDataFactory($http){

  // Storing parsed data of pdf
  var pasrsedData = null;

  return{
    setFoodspecParseData : setFoodspecParseData,
    getFoodspecParseData : getFoodspecParseData,
    foodSpecSave: foodSpecSave,
    getFoodItems: getFoodItems,
    getFoodItemById: getFoodItemById
  };


  function setFoodspecParseData(data){
    pasrsedData = data;
  }

  function getFoodspecParseData(){
    return pasrsedData;
  }

  function foodSpecSave(foodItem){

    return $http.post('/api/foodspec', foodItem).
      then(complete).catch(failed);

  }


  function getFoodItems(){
    return $http.get("/api/foodspec").then(complete).catch(failed);
  }

  function getFoodItemById(id){
    return $http.get("/api/foodspec/" + id).then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }

}
