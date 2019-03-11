/**
 * @file utils/nodesHttpProviderSelect.js
 * @author huangzongzhe
 */
module.exports = function nodesHttpProviderSelect(url_domain, url_ip) {
    if (url_domain.includes('localhost') || !url_domain) {
        return url_ip;
    }
    return url_domain;
}