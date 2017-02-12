'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/database', 'Sequelize'], function(database, sequelize) {

  var Role = database.define('role', {
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });
  
  return Role;
});
