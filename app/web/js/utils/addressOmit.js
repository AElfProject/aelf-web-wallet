/*
 * huangzongzhe
 * 2018.08.24
 */
function addressOmit(address) {
	return address.replace(address.slice(10, 26), '...');
}

export default addressOmit