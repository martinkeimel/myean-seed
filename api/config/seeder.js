'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['sequelize-fixtures', 'app/models'], function(sequelizeFixtures, models) {
    return {
        execute: function () {
            sequelizeFixtures.loadFile('roles.json', models).then(function(){
                console.log('roles file seeded');
            });
        }
    };
});