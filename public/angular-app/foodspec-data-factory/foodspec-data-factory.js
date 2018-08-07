angular.module('foodspec').factory('foodspecDataFactory',foodspecDataFactory);

function foodspecDataFactory($http){
  return{
    foodspecParseData : foodspecParseData
  };


  function foodspecParseData(postData){
    return $http.post("/api/foodspec-parse").then(complete).catch(failed);
  }

  function complete(response){
    return response;
  }

  function failed(error){
    console.log(error.statusText);
  }

}
