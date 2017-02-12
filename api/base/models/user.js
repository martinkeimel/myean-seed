'use strict';

var simpleDI = require('config/simpleDI');

module.exports = simpleDI.inject(['app/database', 'Sequelize', 'crypto', 'base/roleModel'], function(database, sequelize, crypto, role) {

  var User = database.define('user', {
    email: {
      type: sequelize.STRING,
      allowNull: false,
      isEmail: true
    },
    username: {
      type: sequelize.STRING,
      allowNull: false
    },
    hashedPassword: sequelize.STRING,
    salt: sequelize.STRING,
    name: sequelize.STRING,
    admin: sequelize.BOOLEAN,
    guest: sequelize.BOOLEAN,
    provider: sequelize.STRING
  },
  {
    indexes: [
      {
        unique: true,
        fields: ['email']
      },
      {
        unique: true,
        fields: ['username']
      }
    ],
    setterMethods: {
      password: function (value){
        this.setDataValue('salt', this.makeSalt());
        this.setDataValue('hashedPassword', this.encryptPassword(value));
      }
    },
    instanceMethods: {
      makeSalt: function() {
        return crypto.randomBytes(16).toString('base64');
      },
      encryptPassword: function(password) {
        if (!password || !this.salt) { return ''; }
        var salt = new Buffer(this.salt, 'base64');
        return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
      },
      validatePassword: function(plainText) {
        return this.encryptPassword(plainText) === this.hashedPassword;
      }
    }
  });

  User.belongsTo(role, { 
    foreignKey: {
      field: 'roleId',
      allowNull: false,
    }
  });
  return User;
});
