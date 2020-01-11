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
    if (addressPartsArray.length === 3 && addressPartsArray[2] !== window.defaultConfig.ADDRESS_INFO.CURRENT_CHAIN_ID) {
        output = {
            ready: false,
            message: '`Cross Chain` please use iOS/Android wallet.'
        };
        return output;
    }

    // TODO: May Change again.
    const length = address.length;
    // if (length <= 53 && length >= 49 && address.match(/^ELF_/)) {
    if (length <= 51 && length >= 47) {
        // 业务功能
        let addressUse = JSON.parse(localStorage.getItem('lastuse')).address;
        if (address === addressUse && options.compareToUse) {
            output.ready = false;
            output.message = 'Address and current wallet are the same.';
            return output;
        }

        output.ready = true;
        return output;
    }
    output.ready = false;
    output.message = 'error address';
    return output;
}

