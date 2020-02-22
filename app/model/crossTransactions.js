const { crossTransactions } = require('../../database/migrations_table_description/20200218150821-init-cross_transactions/crossTransactions');

module.exports = app => app.model.define('cross_transactions', crossTransactions(app.Sequelize));
