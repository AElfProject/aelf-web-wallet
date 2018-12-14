/**
 *  @file
 *  @author zhouminghui
 *  Token Search component
 */

import React from 'react';
import Svg from '../../../components/Svg/Svg';
import style from './NavToken.scss';
import {historyReplace} from '../../../utils/historyChange';

export default class NavToken extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    handleChange() {
        this.setState({
            value: this.refs.search.value
        });
    }

    handleClick(e) {
        if (e.which === 13) {
            this.props.getTokenName(this.state.value);
            this.props.searchShow();
        }
    }

    render() {
        return (
            <div className={style.Navtoken}>
                <div className={style.goBackBtn}
                    onClick={() => historyReplace('/assets')}
                >
                    <Svg icon={'back22'}
                        style={{display: 'inline-block', height: 36, width: 16}}
                    >
                    </Svg>
                </div>
                <div className={style.search}>
                    <Svg key='1'
                        icon={'search16'}
                        onClick={() => this.onOpenChange()}
                        style={{width: 16, height: 16, display: 'inline-block', marginLeft: '4px'}}
                    ></Svg>
                    <input
                        className={style.searchinput}
                        placeholder='Please input token name.'
                        type='text'
                        onKeyPress={this.handleClick.bind(this)}
                        onChange={value => this.handleChange(value)}
                        ref='search'
                    />
                    <span className='clearBtn'
                        onClick={() => {
                            this.refs.search.value = '';
                            this.setState({
                                key: ''
                            });
                            this.props.searchHide();
                        }}
                    >&Chi;</span>
                </div>
            </div>
        );
    }
}
