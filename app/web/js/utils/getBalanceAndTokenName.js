/**
 * @file getBalanceAndTokenName
 * @author huangzonghze
 * 10.25
 */
/* eslint-disable fecs-camelcase */
// import checkStatus from './checkStatus';
// import {
//     // getParam,
//     // apisauce
// } from '../utils/utils';

import {
    get
} from '../utils/apisauce';

export default function getBalanceAndTokenName(walletAddress, contractAddress, symbol, successCall, failCall) {
    console.log('getBalanceAndTokenName: ', walletAddress, contractAddress);

    get('/address/api/tokens', {
        limit: 10, // 13
        page: 0, // 0
        order: 'desc', // asc
        address: walletAddress,
        contract_address: contractAddress,
        symbol
    }).then(result => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(result);
        successCall(result);
        // callback(result);
    }).catch(error => {
        failCall(error);
        // Toast.fail(error.message, 6);
    });
}

