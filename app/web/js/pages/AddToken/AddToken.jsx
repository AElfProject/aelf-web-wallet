/**
 *  @file
 *  @author zhouminghui
 *  Lists and searches are included on this page
 */

import React from 'react';

import NavToken from './NavToken/NavToken';
import TokenList from './TokenList/TokenList';
import SearchTokenList from './SearchTokenList/SearchTokenList';

require('./AddToken.css');

export default class AddToken extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTokenName: '',
            searchShow: false
        };
    }

    getTokenName(value) {
        this.setState({
            searchTokenName: value
        });
    }

    searchShow() {
        this.setState({
            searchShow: true
        });
    }

    searchHide() {
        this.setState({
            searchShow: false
        });
    }

    render() {
        return (
            <div className = 'Tokenlist' >
                <NavToken
                    getTokenName={this.getTokenName.bind(this)}
                    searchShow={this.searchShow.bind(this)}
                    searchHide={this.searchHide.bind(this)}
                />
                <TokenList
                    searchShow={this.state.searchShow}
                />
                <SearchTokenList
                    value={this.state.searchTokenName}
                    searchShow={this.state.searchShow}
                />
            </div>
        );
    }
}
