'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/resourceModel', 'jsonwebtoken', 'app/config'], function (Resource, jwt, appConfig) {

  return {

    /**
     * Create resource
     * requires: {name, description}
     * returns: {message}
     */
     create: function (req, res, next) {
          Resource.build(
            {
              name: req.body.name,
              description: req.body.description
            })
            .save()
            .then(function(newResource) {
                res.json(200, { message: 'Resource created with id ' + newResource.id });
            })
            .catch( function (error){
                res.json(500, { message: 'An error occurred while trying to create a resource: ' + error });
          });
        },
    
      /**
       *  get all resources
       *  returns {id, name, description, createdAt, updatedAt}
       */
      getAll: function (req, res, next) {          
        
          Resource.findAll({}).then(function (resources) {
           
            if (resources) {
              res.json(resources);
            } else {
              res.json(404, { message: 'Resources not found' });
            }
          });
      },
      
      getById: function (req, res, next) {
         var roleId = req.params.resourceId;
        
          Resource.findById(roleId).then(function (resource) {
            if (resource) {
              res.json(resource);
            } else {
              res.json(404, { message: 'Resource not found' });
            }
          });
      },

      update: function (req, res, next) {
        var idToUpdate = req.params.resourceId;
        Resource.findById(idToUpdate).then(function (resourceToUpdate) {
          if (resourceToUpdate){
            resourceToUpdate.name = req.body.name;
            resourceToUpdate.description = req.body.description;
            resourceToUpdate.save().then(function (updatedRole) {
              res.json(200, { message: 'Resource updated with id ' + updatedRole.id });
            }).
            catch(function (error) {
              res.json(500, { message: 'An error occurred while trying to update resource ' + idToUpdate +': ' + error });
            });
          }
          else
          {
            res.json(404, { message: 'Resource not found' });
          }
        });
       },
      
      delete: function (req, res, next) { 
        //TODO: check the role doesn't have users associated?
        var idToDelete = req.params.resourceId;
        Resource.findById(idToDelete).then(function (resourceToDelete) {
          if (resourceToDelete){
            resourceToDelete.destroy();
            res.json(200, { message: 'Resource deleted' });
          }
          else{
            res.json(404, { message: 'Resource not found' });
          }
          });
      },
  };

});
