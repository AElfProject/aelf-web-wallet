/*
 * huangzongzhe
 * 2018.09.19
 */
import { Toast } from 'antd-mobile';
import ClipboardJS from 'clipboard';

// https://clipboardjs.com/
// selector: button
function clipboard (selector) {
	var clipboard = new ClipboardJS(selector);

	clipboard.on('success', function(e) {
		Toast.info('已复制', 3, () => {}, false);

	    e.clearSelection();
	});

	clipboard.on('error', function(e) {
		Toast.fail('复制失败，请手动选中复制。', 3, () => {}, false);
	});
}

export default clipboard;