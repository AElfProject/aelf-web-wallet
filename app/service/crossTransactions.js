/**
 * @file service/CrossTransactionsService.js
 * @author huangzongzhe
 * 2020.02
 */
/* eslint-disable fecs-camelcase */

const Service = require('../core/baseService');
const AElf = require('aelf-sdk');
const wallet = AElf.wallet;
const ellipticEc = wallet.ellipticEc;

function signatureVerify(options) {
  const {
    address,
    signed_address,
    public_key
  } = options;
  // TODO: optimize, use info from tx to verify the request.
  const key = ellipticEc.keyFromPublic(public_key, 'hex');
  return key.verify(address, signed_address);
}

class CrossTransactionsService extends Service {

  async sent(options) {
    const {ctx} = this;
    const {
      tx_id,
      address,
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
    } = options;

    const verifyResult = signatureVerify({
      address,
      signed_address,
      public_key
    });
    if (verifyResult) {
      return ctx.model.CrossTransactions.create({
        tx_id,
        address,
        from,
        to,
        symbol,
        amount,
        memo,
        time,
        send_node,
        receive_node,
        main_chain_id,
        issue_chain_id
      });
    }
    return 'error signature.';
  }

  async received(options) {
    const {ctx} = this;
    const {
      tx_id,
      address,
      signed_address,
      public_key
    } = options;

    const verifyResult = signatureVerify({
      address,
      signed_address,
      public_key
    });
    if (verifyResult) {
      return ctx.model.CrossTransactions.update({
        status: 1
      }, {
        where: {
          tx_id,
          address
        }
      });
    }
    return 'error signature.';
  }
}

module.exports = CrossTransactionsService;
