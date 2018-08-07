angular.module('foodspec',['ngRoute','ngFileUpload'])
.config(config);


function config($routeProvider, $locationProvider){

    $routeProvider
      .when('/',{
        templateUrl : 'angular-app/foodspec-upload/foodspec-upload.html',
        controller: FoodSpecUploadController,
        controllerAs : 'vm'

      });
      // .when('/hotel/:id',{
      //   templateUrl : 'angular-app/hotel-display/hotel.html',
      //   controller: HotelController,
      //   controllerAs : 'vm'
      //
      // });

      $locationProvider.hashPrefix('');
}
