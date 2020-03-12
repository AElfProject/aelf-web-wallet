'use strict';

const {crossTransactions} = require('../migrations_table_description/20200218150821-init-cross_transactions/crossTransactions');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // /*
    //   Add altering commands here.
    //   Return a promise to correctly handle asynchronicity.
    //
    //   Example:
    //   return queryInterface.createTable('users', { id: Sequelize.INTEGER });
    // */
    await queryInterface.createTable('cross_transactions', crossTransactions(Sequelize));
  },

  down: (queryInterface, Sequelize) => {
    // /*
    //   Add reverting commands here.
    //   Return a promise to correctly handle asynchronicity.
    //
    //   Example:
    //   return queryInterface.dropTable('users');
    // */
    return queryInterface.dropTable('cross_transactions');
  }
};
