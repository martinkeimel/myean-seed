'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/config', 'Sequelize', 'app/seeder'], function(appConfig, Sequelize, seeder) {

  var dbConfig = appConfig.db;

  // Connect to Database and return the connection
  var sequelize = new Sequelize(dbConfig.database, dbConfig.user, dbConfig.password, {
    host: dbConfig.host,
    port: dbConfig.port,
    dialect: 'mysql',  
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    },
  });
  // TODO: seed initial data
  // TODO: add migrations
  // TODO: remove force : true 
  sequelize.sync({force:true}).then(function (a){
    console.log ('Database successfully synced ');
    seeder.execute();
    console.log ('Database successfully seeded ');
  }).catch(function (error) {
    console.log ('ERROR syncing database: ' + error);
  });

  return sequelize;
});
