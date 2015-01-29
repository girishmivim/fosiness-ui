'use strict';

/**
 * @ngdoc overview
 * @name fosinessUiApp
 * @description
 * # fosinessUiApp
 *
 * Main module of the application.
 */
angular
  .module('fosinessUiApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
