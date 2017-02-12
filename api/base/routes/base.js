'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject([
  /*===== login hook auth #1 =====*/
  'base/authenticationMiddleware',
  'base/authorizationMiddleware',
  'base/commonController',
  'base/usersController',
  'base/rolesController'
  /*===== cart hook #1 =====*/
], function (/*===== login hook auth #2 =====*/authenticationMiddleware, authorizationMiddleware, commonController, usersController, rolesController/*===== cart hook #2 =====*/) {

  return function baseRoutes(app) {
    // Config Route
    app.get('/config',
      commonController.config
    );

    // User Routes
    app.post('/auth/users',
      authorizationMiddleware.getAuthorizationFn('signup', 'create'),
      usersController.create
    );

    app.get('/auth/users/:userId',
      authenticationMiddleware.verifySignature,
      authorizationMiddleware.getAuthorizationFn('users', 'view'),
      usersController.show
    );

    app.post('/auth/roles',
      //authorizationMiddleware.getAuthorizationFn('signup', 'create'),
      rolesController.create
    );

    app.get('/auth/roles/:roleId',
      //authenticationMiddleware.verifySignature,
      //authorizationMiddleware.getAuthorizationFn('users', 'view'),
      rolesController.getById
    );
    
    /*===== login hook auth #3 =====*/

    app.get('/api/common/menu/',
      /*===== login hook =====*/
      commonController.menu
    );

    /*===== cart hook #3 =====*/

  };
});
