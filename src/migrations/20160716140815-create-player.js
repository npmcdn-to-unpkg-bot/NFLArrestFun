'use strict';
module.exports = {
  up: function(queryInterface, Sequelize) {
    return queryInterface.createTable('Players', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      arrestCount: {
        type: Sequelize.INTEGER
      },
      totalEarnings: {
        type: Sequelize.INTEGER
      },
      draftPick: {
        type: Sequelize.INTEGER
      },
      position: {
        type: Sequelize.STRING
      },
      team: {
        type: Sequelize.STRING
      },
      wikilink: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: function(queryInterface, Sequelize) {
    return queryInterface.dropTable('Players');
  }
};