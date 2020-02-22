'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
    const {router, controller} = app;
    router.get('/', controller.home.index);

    router.get('/transactiondetail', controller.home.transactionDetail);

    router.get('/address/api/tokens', controller.address.getTokens);
    router.get('/cross/api/list', controller.crossTransactions.list);
    router.post('/cross/api/sent', controller.crossTransactions.sent);
    router.post('/cross/api/received', controller.crossTransactions.received);
};
