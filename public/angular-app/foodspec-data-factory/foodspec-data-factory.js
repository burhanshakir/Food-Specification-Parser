angular.module('foodspec').factory('foodspecDataFactory',foodspecDataFactory);

function foodspecDataFactory($http){

  // Storing parsed data of pdf
  var pasrsedData = null;

  return{
    setFoodspecParseData : setFoodspecParseData,
    getFoodspecParseData : getFoodspecParseData
  };


  function setFoodspecParseData(data){
    pasrsedData = data;
  }

  function getFoodspecParseData(){
    return pasrsedData;
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }

}
