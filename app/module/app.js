(function(angular) {
'use strict';
var homeInculdeApp = angular.module('homeIncludeApp', [ 'ngRoute' ,'fosUserModule','fosSellerModule','buyerModule']);

homeInculdeApp.config([ '$routeProvider', function($routeProvider) {

    $routeProvider.when('/', {
        templateUrl : 'module/home/views/home.html',

    }).when('/userRegistration', {
        templateUrl : 'module/user/userForm.html',
        controller  : 'fos.registration.userRegistrationCtrl',
    }).when('/sellerRegistration', {
        templateUrl : 'module/seller/sellerForm.html',
        controller  : 'fos.registration.sellerRegistrationCtrl',
    }).when('/buyerRegistration',{
    	templateUrl : 'module/buyer/buyer_form.html',
    	controller	: 'fos.registration.buyerRegistrationCtrl'
    })
    .otherwise({
        redirectTo : '/'
    });
}]);
})(window.angular);