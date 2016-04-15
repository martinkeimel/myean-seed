'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['sequelize-fixtures', 'app/models'], function(sequelize_fixtures, models) {
    return {
        execute: function () {
            sequelize_fixtures.loadFile('roles.json', models).then(function(){
                console.log('roles file seeded');
            });
        }
    };
});