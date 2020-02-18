/**
 * @Controller Cross
 */
// app/controller/users.js
const { Controller } = require('egg');

// function getTxStatus(tx_status) {
//   // 0: Mined; 1:Pending; 2:Failed; 3:not existed
//   const txStatusList = {
//     mined: 0,
//     pending: 1,
//     failed: 2,
//     'not existed': 3
//   };
//   const txStatus = txStatusList[tx_status.toLowerCase()];
//   return txStatus;
// }

class CrossTransactionsController extends Controller {
  /*
   * @summary 创建用户
   * @description 创建用户，记录用户账户/密码/类型
   * @router POST /api/record/insert
   * @request body string txid ''
   * @request body string address ''
   * @request body string lotteries ''
   * @request body number period ''
   * @response 200 baseResponse 创建成功
   */
  // http://127.0.0.1:7001/api/record/insert
  // {
  //   "txid": "3",
  //   "address": "3",
  //   "lotteries": "{}",
  //   "period": 1
  // }
  // async insert() {
  //   const { ctx } = this;
  //   const {
  //     txid,
  //     address,
  //     lotteries,
  //     period,
  //     tx_status
  //   } = ctx.request.body;
  //   if (!txid || !address || !lotteries || !period || !tx_status) {
  //     ctx.status = 404;
  //     ctx.body = 'Params Error';
  //     return;
  //   }
  //   const record = await ctx.model.Record.create({
  //     transaction: txid,
  //     address,
  //     lotteries,
  //     period,
  //     tx_status: getTxStatus(tx_status)
  //   });
  //
  //   ctx.body = record;
  // }

  // http://127.0.0.1:7001/api/record/update
  // {
  //   "txid": "3",
  //   "address": "3",
  //   "status": 1
  // }
  // TODO: 身份验证 地址校验随机签名。
  // async update() {
  //   const { ctx } = this;
  //   const {
  //     txid,
  //     address,
  //     status
  //   } = ctx.request.body;
  //   console.log({
  //     txid,
  //     // address,
  //     status
  //   });
  //   if (!txid || !address) {
  //     ctx.status = 404;
  //     ctx.body = 'Params Error 233';
  //     return;
  //   }
  //   const record = await ctx.model.Record.update({
  //     status
  //   }, {
  //     where: {
  //       transaction: txid
  //     }
  //   });
  //
  //   ctx.body = record;
  // }

  // async updateTxStatus() {
  //   const { ctx } = this;
  //   const {
  //     tx_list
  //   } = ctx.request.body;
  //
  //   const txList = tx_list;
  //   // {
  //   //   txid,
  //   //   address,
  //   //   tx_status
  //   // }
  //   const records = txList.map(item => {
  //     const {
  //       txid,
  //       address,
  //       tx_status
  //     } = item;
  //
  //     if (!txid || !address || !tx_status) {
  //       ctx.status = 404;
  //       ctx.body = 'Params Error 233';
  //       return false;
  //     }
  //     return ctx.model.Record.update({
  //       tx_status: getTxStatus(tx_status)
  //     }, {
  //       where: {
  //         transaction: txid
  //       }
  //     });
  //   });
  //   ctx.body = await Promise.all(records);
  // }

  // http://127.0.0.1:7001/api/record/list?address=2&offset=0&limit=5
  async list() {
    const { ctx } = this;
    const {
      address,
      offset,
      limit
    } = ctx.request.query;

    ctx.body = await ctx.model.CrossTransactions.findAll({
      where: {
        address
      },
      offset: parseInt(offset, 10),
      limit: parseInt(limit, 10)
    });
  }
}

module.exports = CrossTransactionsController;
