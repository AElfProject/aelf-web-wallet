'use strict';

const Controller = require('egg').Controller;
const nodeConfig = require('../../config/config.node.js');

class HomeController extends Controller {
  async index() {
   await this.ctx.render('index.tpl', {
    ...nodeConfig
   });
  }
  async transactionDetail() {
   await this.ctx.render('transactionDetail.tpl', {
   	...nodeConfig
   });
  }
}

module.exports = HomeController;
