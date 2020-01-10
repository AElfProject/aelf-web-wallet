/**
 * @file addressOmit.js
 * @author huangzongzhe
 * 2018.08.24
 */

export default function addressOmit(address) {
	if (address) {
		return address.replace(address.slice(8, 42), '...');
	} else {
		return 'missing address';
	}
}
