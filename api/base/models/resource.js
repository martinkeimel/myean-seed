'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/database', 'Sequelize'], function(database, sequelize) {

  var Resource = database.define('resource', {
    name: {
      type: sequelize.STRING,
      allowNull: false
    },
    description: {
      type: sequelize.STRING,
      allowNull: true
    }
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['name']
      }
    ]
  });

  return Resource;
});
