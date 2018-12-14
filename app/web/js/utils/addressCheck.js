/**
 * @file addressCheck.js
 * @author huangzongzhe
 * 2018.12.13
 */
function addressCheck (address = '') {
    let output = {
        ready: true,
        message: ''
    };

    // TODO: May Change again.
    if (address.length === 53 && address.match(/^ELF_/)) {
    // if (address.length === 36) {
        let addressUse = JSON.parse(localStorage.getItem('lastuse')).address;
        if (address === addressUse) {
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

export default addressCheck
