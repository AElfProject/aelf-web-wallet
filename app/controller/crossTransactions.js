/**
 * @Controller CrossTransactionsController
 */
// app/controller/CrossTransactionsController.js
const { Controller } = require('egg');
const baseController = require('../core/baseController');
const AElf = require('aelf-sdk');

class CrossTransactionsController extends baseController {

  // http://127.0.0.1:7001/api/record/list?address=2&offset=0&limit=5
  async list() {
    const { ctx } = this;
    const {
      address,
      offset,
      limit
    } = ctx.request.query;

    try {
      const result = await ctx.model.CrossTransactions.findAll({
        where: {
          from: address,
          status: 0
        },
        offset: parseInt(offset, 10),
        limit: parseInt(limit, 10),
        order: [[ 'id', 'DESC' ]]
      });
      this.formatOutput('get', result);
    } catch (error) {
      this.formatOutput('error', error, 422);
    }
  }

  async sent() {
    const { ctx } = this;
    const {
      tx_id,
      from,
      to,
      symbol,
      amount,
      memo,
      time,
      send_node,
      receive_node,
      main_chain_id,
      issue_chain_id,
      signed_address,
      public_key
    } = ctx.request.body;

    const options = {
      tx_id,
      from,
      to,
      symbol,
      amount,
      memo,
      time,
      send_node,
      receive_node,
      main_chain_id,
      issue_chain_id,
      signed_address,
      public_key
    };

    const keysRule = {
      tx_id: 'string',
      from: 'string',
      to: 'string',
      symbol: 'string',
      amount: 'string',
      memo: {
        type: 'string',
        required: false,
        allowEmpty: true
      },
      time: 'string',
      send_node: 'string',
      receive_node: 'string',
      main_chain_id: 'string',
      issue_chain_id: 'string'
    };

    const signedAddressRule = {
      r: 'string',
      s: 'string',
      recoveryParam: 'int'
    };

    const publicKeyRule = {
      x: 'string',
      y: 'string'
    };

    try {
      ctx.validate(keysRule, options);
      ctx.validate(signedAddressRule, signed_address);
      ctx.validate(publicKeyRule, public_key);
      const result = await ctx.service.crossTransactions.sent(options);
      this.formatOutput('get', result);
    } catch (error) {
      this.formatOutput('error', error, 422);
    }
  }

  async received() {
    const { ctx } = this;
    const {
      tx_id,
      address,
      signed_address,
      public_key
    } = ctx.request.body;

    const keysRule = {
      tx_id: 'string',
      address: 'string'
    };

    const signedAddressRule = {
      r: 'string',
      s: 'string',
      recoveryParam: 'int'
    };

    const publicKeyRule = {
      x: 'string',
      y: 'string'
    };

    const options = {
      tx_id,
      address,
      signed_address,
      public_key
    };

    try {
      ctx.validate(keysRule, options);
      ctx.validate(signedAddressRule, signed_address);
      ctx.validate(publicKeyRule, public_key);
      const result = await ctx.service.crossTransactions.received(options);
      this.formatOutput('get', result);
    } catch(error) {
      this.formatOutput('error', error, 422);
    }
  }
}

module.exports = CrossTransactionsController;
