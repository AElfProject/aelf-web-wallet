/*
 * huangzonghze
 * 10.25
 */
import checkStatus from './checkStatus'

export default function getBalanceAndTokenName(walletAddress, contractAddress, successCall, failCall) {
    console.log('getBalanceAndTokenName: ', walletAddress, contractAddress);
    let params = {
        address: walletAddress,
        contract_address: contractAddress
    };

    let query = '';
    for (let each in params) {
        query += `${each}=${params[each]}&`;
    }

    fetch(`/block/api/address/balance?${query}`, {
        credentials: 'include',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(checkStatus).then(result => {
        result.text().then(result => {
            let output = JSON.parse(result);
            successCall(output);
            // this.setState({
            //     balance: output.balance,
            //     tokenName: output.tokenDetail.name,
            //     contract_address: params.contract_address
            // });
        })
    }).catch(error => {
        failCall(error);
        console.log('error:', error);
    });
}

