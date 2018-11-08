// fetch demo
// https://www.npmjs.com/package/whatwg-fetch#sending-cookies
// use demo
// 需要自己配置错误处理
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response
    } else {
        var error = new Error(response.statusText)
        error.response = response
        console.log('error response: ', response);
        throw error
    }
}

fetch('/api/transactions', {
    credentials: 'include',
    method: 'POST',
    headers: {
        // 使用post的时候，egg需要配套加上这个，从cookie中获取,
        // csrf token方案
        // csrf: https://github.com/pillarjs/understanding-csrf/blob/master/README_zh.md
        // csrf: https://www.ibm.com/developerworks/cn/web/1102_niugang_csrf/index.html
        // let csrf = document.cookie.match(/^csrfToken=[^;]*/)[0].replace('csrfToken=', '')
        'x-csrf-token': 'mLIWWXSe1YFH0awM31IkL6X5',
        'Content-Type': 'application/json'
    },

    body: JSON.stringify({
        address: 'hzz233',
        limit: 'aaa1',
        page: '0'
    })
}).then(checkStatus).then(result => {
    console.log(result);
}).catch(error => {console.log('error:', error)});