angular.module('foodspec').controller('FoodSpecUploadController', ['Upload',FoodSpecUploadController]);

function FoodSpecUploadController(foodspecDataFactory,$route,$window,$routeParams){

    var vm = this;
    var params = $routeParams.id;


    vm.parsePdf = function(pdfFile) {

    // var token = jwtHelper.decodeToken($window.sessionStorage.token);
    // var username = token.username;

    var postData = {
      email: vm.email,
      file: pdfFile
    };

    if (vm.pdfUploadForm.$valid) {


      foodspecDataFactory.foodspecParseData(postData).then(function(response)
      {
        console.log(response);
        if (response.status === 201) {

          // $route.reload();
        }

      }).catch(function(error) {

        console.log(error);
      });

    }
    else {
      vm.isSubmitted = true;
    }
  };


}
