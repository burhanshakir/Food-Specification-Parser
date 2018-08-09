angular.module('foodspec').factory('foodspecDataFactory',foodspecDataFactory);

function foodspecDataFactory($http){

  // Storing parsed data of pdf
  var pasrsedData = null;

  return{
    setFoodspecParseData : setFoodspecParseData,
    getFoodspecParseData : getFoodspecParseData,
    foodSpecSave: foodSpecSave
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

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }

}
