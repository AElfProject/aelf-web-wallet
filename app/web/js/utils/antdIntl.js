/** @file
 *  @author zhouminghui
 *  antd国际化相关配置与语言的判断
 */

import enUS from 'antd-mobile/lib/locale-provider/en_US';

export default function antdChooseLocale() {
    let Languge = null;
    if (localStorage.language === undefined) {
        localStorage.setItem('language', 'zh-CN');
        Languge = localStorage.language;
    }
    else {
        Languge = localStorage.language;
    }

    switch (Languge) {
        case 'zh-CN':
            return undefined;
        default:
            return enUS;
    }
}