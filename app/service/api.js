// app/service/api.js
const Service = require('egg').Service;

// 尽量不要直接使用使用sql来查询，如果非要使用的话，请用escape方法。
// This just uses connection.escape() underneath
// const postId = 1;
// const results = await this.app.mysql.query('update posts set hits = (hits + ?) where id = ?', [1, postId]);
class ApiService extends Service {

    async transactions(options) {
        const aelf0 = this.ctx.app.mysql.get('aelf0');
        const {address, limit, page} = options;

        const offset = limit * page;
        let result = await aelf0.query('select * from transactions_0 where params_to = ? limit  ? offset  ?', [address, limit, offset]);
        return result;
    }
}

module.exports = ApiService;