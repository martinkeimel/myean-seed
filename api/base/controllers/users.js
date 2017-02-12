'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['base/userModel', 'jsonwebtoken', 'app/config'], function (User, jwt, appConfig) {

  var secretKey = appConfig.secretKey;

  return {

    /**
     * Create user
     * requires: {username, password, email}
     * returns: {email, password}
     */
      create: function (req, res, next) {
          User.build({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            provider: 'local',
            roleId: req.body.role.id
          })
          .save()
          .then(function(createdUser) {
            var response = {
                user: createdUser,
                exp: Math.round(new Date().setDate(new Date().getDate() + 1) / 1000)
            };
            
            var token = jwt.sign(response, secretKey, {
                expiresInMinutes: 1440
            });
                        
            res.json(200, { token: token, message: 'User created.' });
          })
          .catch( function (error){
              res.json(500, { message: 'An error occurred while trying to create a user: ' + error });
          });
        },
    
      /**
       *  Show profile
       *  returns {username, role}
       */
      show: function (req, res, next) {
          var userId = req.params.userId;
          User.findById(userId).then(function (user) {
            if (user) {
              res.json({username: user.username, role: user.role });
            } else {
              res.json(404, { message: 'User not found' });
            }
          })
          .catch( function (error){
              res.json(500, { message: 'An error occurred while trying to show a user: ' + error });
          });
        },
    
      /**
       *  Username exists
       *  returns {exists}
       */
      exists: function (req, res, next) {
          var username = req.params.username;
          User.findOne({ username : username })
            .then(function (user) {
              if(user) {
                res.json({exists: true});
              } else {
                res.json({exists: false});
              }
          })
          .catch( function (error){
              res.json(500, { message: 'An error occurred while trying to check user existance: ' + error });
          });
      }
    
  };

});
