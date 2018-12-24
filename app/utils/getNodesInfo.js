/**
 * @file utils/getNodesInfo.js
 * @author huangzonghze
 * @param ctx
 * @param curlOptions
 * @return {Promise<HTMLElement | string>}
 */
const {apiServerProvider} = require('../../config/config.node.js');

// TODO. Get list from redis.
// get list from api now.
module.exports = async function getNodesInfo(ctx, curlOptions = {}) {
    const nodesInfo = await ctx.curl(apiServerProvider + '/api/nodes/info', curlOptions);
    // console.log('nodesInfo: ', nodesInfo);
    if (nodesInfo && nodesInfo.data) {
        return nodesInfo.data.list;
    }
    throw Error('no information of nodes 111.');
}