'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
   await this.ctx.render('index.tpl', '');
  }
  async transactionDetail() {
   await this.ctx.render('transactionDetail.tpl', '');
  }
}

module.exports = HomeController;
