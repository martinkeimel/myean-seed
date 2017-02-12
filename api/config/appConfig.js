'use strict';

module.exports = {
  port: process.env.PORT || 3000,
  db: {
    host: process.env.MYSQLHOST || 'localhost',
    port: process.env.MYSQLPORT || 3306,
    user: process.env.MYSQLUSER || 'myean-seed',
    password: process.env.MYSQLPASSWORD || 'P@ssword',
    database: process.env.MYSQLDB || 'myean-seed'
  },
  secretKey: 'ourSecretKey'
};
