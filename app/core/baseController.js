/**
 * @file baseController.js
 * @author huangzongzhe
 */
const {Controller} = require('egg');
class BaseController extends Controller {
    // demo
    // get user() {
    //     return this.ctx.session.user;
    // }

    formatOutput(type, result, errCode) {
        const ctx = this.ctx;
        switch (type) {
            case 'get':
                ctx.status = 200;
                break;
            case 'post':
                ctx.status = 201;
                break;
            case 'put':
                ctx.status = 204;
                break;
            case 'error':
                ctx.status = parseInt(errCode, 10);
                if (typeof result !== 'object') {
                    result = {
                        message: result
                    };
                }
                else {
                    result = {
                        message: result.message || JSON.stringify(result)
                    };
                }

                break;
            default:
        }
        ctx.body = JSON.stringify(result);
    }
}
module.exports = BaseController;
