/**
 * @file addressCheck.js
 * @author huangzongzhe
 * 2018.12.13
 */

export default function addressCheck(address = '', options = {
    compareToUse: true
}) {
    let output = {
        ready: true,
        message: ''
    };

    const addressPartsArray = address.split('_');
    let addressFroTx = address;
    if (addressPartsArray.length === 3) {
        if (addressPartsArray[2] !== window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID) {
            output = {
                ready: true,
                isCrossChain: true,
                message: '`Cross Chain` please use iOS/Android wallet.'
            };
            return output;
        }
        if (addressPartsArray[0] !== window.defaultConfig.ADDRESS_INFO.PREFIX) {
            output = {
                ready: false,
                message: 'Address Error'
            };
            return output;
        }
        addressFroTx = addressPartsArray[1];
    }

    const length = addressFroTx.length;
    if (length <= 51 && length >= 47) {
        // 业务功能
        let addressUse = JSON.parse(localStorage.getItem('lastuse')).address;
        if (addressFroTx === addressUse && options.compareToUse) {
            output = {
                ready: false,
                message: 'Address of current wallet.'
            };
            return output;
        }

        output.ready = true;
        return output;
    }
    output = {
        ready: false,
        message: 'Address Error'
    };
    return output;
}

