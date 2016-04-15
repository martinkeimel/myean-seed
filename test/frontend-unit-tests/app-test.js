'use strict';

angular.module('myean', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngRoute'
])
  .config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
  })
