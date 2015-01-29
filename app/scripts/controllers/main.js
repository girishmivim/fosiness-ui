'use strict';

/**
 * @ngdoc function
 * @name fosinessUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the fosinessUiApp
 */
angular.module('fosinessUiApp')
  .controller('MainCtrl', function ($scope, $http) {
  	$http.get('/fosiness-web/services/sector/getsectors');
  	debugger;
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
