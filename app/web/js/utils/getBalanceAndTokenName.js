/**
 * @file getBalanceAndTokenName
 * @author huangzonghze
 * 10.25
 */
/* eslint-disable fecs-camelcase */
// import checkStatus from './checkStatus';
import {
    getParam,
    apisauce
} from '../utils/utils';

export default function getBalanceAndTokenName(walletAddress, contractAddress, successCall, failCall) {
    console.log('getBalanceAndTokenName: ', walletAddress, contractAddress);

    apisauce.get('/address/api/tokens', {
        limit: 10, // 13
        page: 0, // 0
        order: 'desc', // asc
        address: walletAddress,
        contract_address: contractAddress
    }).then(result => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>');
        console.log(result);
        successCall(result);
        // callback(result);
    }).catch(error => {
        failCall(error);
        // Toast.fail(error.message, 6);
    });

    // apisauce.get('wallet/api/proxy', {
    //     token: getParam('token', window.location.href),
    //     ptype: 'api',
    //     action: 'address_balance',
    //     address: walletAddress,
    //     contract_address: contractAddress
    // }).then(result => {
    //     successCall(result.result);
    // }).catch(error => {
    //     failCall(error);
    //     console.log('error:', error);
    // });
}

