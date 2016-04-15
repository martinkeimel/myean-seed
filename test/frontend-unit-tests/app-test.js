'use strict';

angular.module('myean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute',
  'ui.bootstrap'
])
  .config(function ( $locationProvider) {
    $locationProvider.html5Mode(true);
  })