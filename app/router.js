'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.get('/transactiondetail', controller.home.transactionDetail);

    router.get('/wallet/api/proxy', controller.proxy.proxy);
};
