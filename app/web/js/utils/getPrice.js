/*
 * huangzongzhe
 * 2020.01.04
 */
import {get} from "./apisauce";

const priceTemp = {};
const getPrice = function (tokenName, callback, failBack) {
  if (priceTemp.tokenName) {
    callback(priceTemp.tokenName);
    return;
  }
  get('/api/token/price', {
    fsym: tokenName,
    tsyms: 'USD'
  }).then(result => {
    priceTemp.tokenName = result;
    callback(result);
  }).catch(error => {
    failBack(error);
  });
};

export default getPrice;
