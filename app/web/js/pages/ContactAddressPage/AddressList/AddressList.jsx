/**
 *  @file
 *  @author zhouminghui
 *  2018.12.5
 *  重构联系人列表
 *  sigente 用于辨别是否有字母分类
 *  content 与 newcontent 赋别
 */

import React from 'react';
import pinyinSegSort from '../../../utils/pinyinSegSort';
import ListItem from '../ListItem/ListItem';

require('./AddressList.css');

export default class AddressList extends React.Component {
    constructor(props) {
        super(props);
        this.letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        this.signet = -2;
        this.othersignet = -1;
        this.state = {
            content: JSON.parse(localStorage.content).CONTENT,
            newContent: null
        };
    }

    componentDidMount() {
        let newAddress = pinyinSegSort(this.state.content);
        let Message = newAddress;
        let Content = {
            CONTENT: Message
        };
        localStorage.setItem('content', JSON.stringify(Content));

        this.setState({
            newContent: newAddress
        });
    }

    removeContent(index) {
        let newContent = this.state.newContent;
        newContent.splice(index, 1);
        let Message = newContent;
        let Content = {
            CONTENT: Message
        };
        localStorage.setItem('content', JSON.stringify(Content));
        this.setState({
            newContent
        });
    }

    mainList(content) {
        let signet = this.signet;
        let letters = this.letters;
        let removeContent = this.removeContent.bind(this);
        const listitem = content.map(function (content, index) {
            if (signet !== letters.indexOf(content.srt) && letters.indexOf(content.srt) !== -1) {
                signet = letters.indexOf(content.srt);
                return (
                    <ListItem
                        key={index}
                        removeItem={index}
                        letter={letters[signet]}
                        first={true}
                        name={content.name}
                        address={content.address}
                        removeContent={removeContent}
                    />
                );
            }
            else if (letters.indexOf(content.srt) === -1) {
                return false;
            }
            return (
                <ListItem
                    key={index}
                    removeItem={index}
                    letter={letters[signet]}
                    first={false}
                    name={content.name}
                    address={content.address}
                    removeContent={removeContent}
                />
            );
        });

        return listitem;
    }

    render() {
        let newcontent = this.state.newContent;
        if (newcontent == null) {
            return <div className='addresslist'></div>;
        }
        let listitem = this.mainList(newcontent);
        return (
            <div className='addresslist'>
                {listitem}
            </div>
        );

    }
}
