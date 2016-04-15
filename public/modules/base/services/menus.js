'use strict';

/* Services */
angular.module('myean').service('menuService', function ($http) {
  this.get = function () {
    return $http.get('/api/common/menu/');
  };
});
