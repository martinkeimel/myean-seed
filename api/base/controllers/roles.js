'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/roleModel', 'jsonwebtoken', 'app/config'], function (Role, jwt, appConfig) {

  return {

    /**
     * Create role
     * requires: {name}
     * returns: {message}
     */
      create: function (req, res, next) {
          Role.build(
            {
              name: req.body.name
            })
            .save()
            .then(function(newRole) {
                res.json(200, { message: 'Role created with id ' + newRole.id });
            })
            .catch( function (error){
                res.json(500, { message: 'An error occurred while trying to create a role: ' + error });
          });
        },
    
      /**
       *  get all roles
       *  returns {id, name, createdAt, updatedAt}
       */
      getAll: function (req, res, next) {          
        
          Role.findAll({}).then(function (roles) {
           
            if (roles) {
              res.json(roles);
            } else {
              res.json(404, { message: 'Roles not found' });
            }
          });
      },
      
      getById: function (req, res, next) {
         var roleId = req.params.roleId;
        
          Role.findById(roleId).then(function (role) {
            if (role) {
              res.json(role);
            } else {
              res.json(404, { message: 'Role not found' });
            }
          });
      },
            
      update: function (req, res, next) {
        var idToUpdate = req.params.roleId;
        Role.findById(idToUpdate).then(function (roleToUpdate) {
          if (roleToUpdate){
            roleToUpdate.name = req.body.name;
            roleToUpdate.save().then(function (updatedRole) {
              res.json(200, { message: 'Role updated with id ' + updatedRole.id });
            }).
            catch(function (error) {
              res.json(500, { message: 'An error occurred while trying to update role ' + idToUpdate +': ' + error });
            });
          }
          else
          {
            res.json(404, { message: 'Role not found' });
          }
        });
       },
      
      delete: function (req, res, next) { 
        //TODO: check the role doesn't have users associated?
        var idToDelete = req.params.roleId;
        Role.findById(idToDelete).then(function (roleToDelete) {
          if (roleToDelete){
            roleToDelete.destroy();
            res.json(200, { message: 'Role deleted' });
          }
          else{
            res.json(404, { message: 'Role not found' });
          }
          });
      },
  };

});
