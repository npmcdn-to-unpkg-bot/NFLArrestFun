'use strict';
module.exports = function(sequelize, DataTypes) {
  var Player = sequelize.define('Player', {
    name: DataTypes.STRING,
    arrestCount: DataTypes.INTEGER,
    totalEarnings: DataTypes.INTEGER,
    draftPick: DataTypes.INTEGER,
    position: DataTypes.STRING,
    team: DataTypes.STRING,
    wikilink: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Player;
};