/*
 * huangzongzhe
 * 2018.08.24
 */
function addressOmit(address) {
	return address.replace(address.slice(8, 42), '...');
}

export default addressOmit
