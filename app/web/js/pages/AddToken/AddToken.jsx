/** @file
 *  @author zhouminghui
 *  列表与搜索包含在该页面
 */

import React from 'react';

import NavToken from './NavToken/NavToken';
import TokenList from './TokenList/TokenList';

require('./AddToken.css');

export default class AddToken extends React.Component {
    render() {
        return (
            <div className = 'Tokenlist' >
                <NavToken />
                <TokenList />
            </div>
        );
    }
}
