'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/api/transactions', controller.api.getTransactions);
  router.post('/api/transactions', controller.api.postTransactions);
};
