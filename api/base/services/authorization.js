'use strict';

var simpleDI = require('config/simpleDI');

// TODO: Add required models here
module.exports = simpleDI.inject(['base/rolesController', 'base/resourcesController', 'app/permissions'], function (rolesController, resourcesController, permissions) {

  return {
    /**
     * Checks if a list of roles is allowed to access an resources's action
     */
    isAuthorized: function (roles, resource, action, callback) {
      // TODO: hardcoded
      return true;
      /*var perms = [];
      rolesController.getAll()
      roles.forEach(function (role) {
        if (permissions[role]) {
          perms = perms.concat(permissions[role]);
        }
      });

      for (var i = 0; i < perms.length; i++) {
        if (perms[i].resource === resource && perms[i].action === action) {
          return callback(null, true);
        }
      }

      return callback(null, false);*/
    }

  };

});
