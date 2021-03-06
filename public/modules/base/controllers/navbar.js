'use strict';

angular.module('myean').controller('NavbarCtrl', function ($scope,$rootScope, $location, $sessionStorage, authService, menuService) {

    $scope.menu = {
        base: []
    };

    $scope.logout = function() {
           authService.logout();
           $rootScope.unsetCurrentUser();
           $sessionStorage.$reset();
           $location.path('/login');
    };

    $scope.manageRoles = function () {
        $location.path('/roles');
    };
    
    $scope.manageResources = function () {
        $location.path('/resources');
    };
    $scope.init = function() {
        menuService.get()
            .success(function (response, status, headers, config) {
                $scope.menu = response;
                console.log(response);
            })
            .error(function (error, status, headers, config) {
                console.log(error)
            });
    }

    $scope.init();
});
