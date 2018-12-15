/**
 * @file
 * @author zhouminghui
 * tokenOmit()
*/

export default function tokenOmit(token) {
    return token.replace(token.slice(10, 26), '...');
}
