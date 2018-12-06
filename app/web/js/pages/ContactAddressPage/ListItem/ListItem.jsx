/** @file
 *  @author zhouminghui
 *  2018.12.5
 *  拆分出可复用的部分，爽歪歪 真的多。。。
 */

import React from 'react';
import {SwipeAction} from 'antd-mobile';
require('./ListItem.css');


export default class ListItem extends React.Component {

    // constructor(props) {
    //     super(props);
    // }

    // 词汇分类
    firstHtml(letter) {
        return <div className='ListClass'>{letter}</div>;
    }

    render() {
        let letter = this.props.letter;
        let name = this.props.name;
        let address = this.props.address;
        let firstHtml = this.firstHtml(letter);
        let removeItem = this.props.removeItem;
        return (
            <div>
                {this.props.first ? firstHtml : null}
                <SwipeAction
                    autoClose
                    right={[
                        {
                            text: 'DELETE',
                            onPress: () => {
                                this.props.removeContent(removeItem);
                            },
                            style: {backgroundColor: '#FF0080', color: 'white'}
                        }
                    ]}
                >
                    <div className='listname' >{name}</div>
                    <div className='listaddress' >{address}</div>
                </SwipeAction>
            </div>
        );
    }
}
