angular.module('foodspec',['ngRoute','ngFileUpload'])
.config(config);


function config($routeProvider, $locationProvider){

    $routeProvider
      .when('/',{
        templateUrl : 'angular-app/foodspec-upload/foodspec-upload.html',
        controller: FoodSpecUploadController,
        controllerAs : 'vm'

      })
      .when('/foodspecSave',{
        templateUrl : 'angular-app/foodspec-save/foodspec-save.html',
        controller: FoodSpecSaveController,
        controllerAs : 'vm'

      });

      $locationProvider.hashPrefix('');
      // $locationProvider.html5Mode({
      //   enabled: true,
      //   requireBase: false
      // });
}
