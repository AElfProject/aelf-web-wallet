'use strict';

const Controller = require('egg').Controller;

// const file = path.resolve(__dirname, '../view/index.html');
// let index;
// fs.readFile(file, (err, data) => {
//   index = data;
// });

class HomeController extends Controller {
  async index() {
  	// this.ctx.set('Content-Type', 'text/html');
   //  this.ctx.body = index;
   await this.ctx.render('index.tpl', '');
    // this.ctx.body = 'hi, egg';
    // this.ctx.render('index.html');
  }
}

module.exports = HomeController;
