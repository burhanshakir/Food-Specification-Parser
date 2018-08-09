angular.module('foodspec').controller('FoodSpecUploadController', ['Upload','$timeout',FoodSpecUploadController]);

function FoodSpecUploadController(foodspecDataFactory,Upload,$timeout,$route,$window,$routeParams){

    var vm = this;
    var params = $routeParams.id;


    vm.parsePdf = function(pdfFile) {

    // var token = jwtHelper.decodeToken($window.sessionStorage.token);
    // var username = token.username;

    // var postData = {
    //   file: pdfFile
    // };
    //
    // if (vm.pdfUploadForm.$valid) {
    //
    //
    //   foodspecDataFactory.foodspecParseData(postData).then(function(response)
    //   {
    //     console.log("Response in angular:",response);
    //     if (response.status === 201) {
    //
    //       // $route.reload();
    //     }
    //
    //   }).catch(function(error) {
    //
    //     console.log(error);
    //   });
    //
    // }
    // else {
    //   vm.isSubmitted = true;
    // }


    pdfFile.upload = Upload.upload({

      url: 'http://localhost:3000/api/foodspec-parse',
      data: {file: pdfFile},

    });

    pdfFile.upload.then(function (response) {
      $timeout(function () {
        pdfFile.result = response.data;

        if(response.status == '200'){
          console.log("Successfully parsed your data!");

          // Saving the data to factory functions so as to use it in other controllers
          foodspecDataFactory.setFoodspecParseData(response.data)

          // Show form for data parsed
          $window.location.href = '/#/foodspecSave';

        }
      });
    })
  }




  vm.viewProducts = function(){
    console.log("View Products!");

    // Show form for data parsed
    $window.location.href = '/#/foodspecView';
  }
}
