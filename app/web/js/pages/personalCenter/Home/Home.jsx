/*
 * huangzongzhe
 * 2018.07.31
 */
import React, {
	Component
} from 'react'

import { List } from 'antd-mobile'
import { hashHistory } from 'react-router'

import style from './Home.scss'

import Svg from '../../../components/Svg/Svg'
import ListContent from '../../../components/ListContent/ListContent'

const Item = List.Item;

class personalCenterHome extends Component { 
	render() {
		return (
			<div className={style.container + ' ' + 'aelf-personal-pages aelf-solid'}>

	            <List className={style.aelfList}>
	                <Item onClick={() => hashHistory.push('/personalcenter/walletmanage?title=钱包管理')}>
                        <ListContent
                            icon="wallet16"
                            text="钱包管理"
                        ></ListContent>
                    </Item>
	            </List>

                <List className={style.aelfList}>
                    <Item onClick={() => hashHistory.push('/personalcenter/home')}>
                        <ListContent
                            icon="tx_history16"
                            text="交易记录【暂无】"
                        ></ListContent>
                    </Item>
                </List>

                <div className={style.blank}></div>

                <List className={style.aelfList}>
                    <Item onClick={() => hashHistory.push('/personalcenter/home')}>
                        <ListContent
                            type="small"
                            icon="contact16"
                            text="联系人【暂无】"
                        ></ListContent>
                    </Item>
                </List>
                <List className={style.aelfList}>
                    <Item onClick={() => hashHistory.push('/personalcenter/home')}>
                        <ListContent
                            type="small"
                            icon="setting16"
                            text="系统设置【暂无】"
                        ></ListContent>
                    </Item>
                </List>
                <List className={style.aelfList}>
                    <Item onClick={() => hashHistory.push('/personalcenter/help?title=帮助中心')}>
                        <ListContent
                            type="small"
                            icon="help16"
                            text="帮助中心"
                        ></ListContent>
                    </Item>
                </List>
                <List className={style.aelfList}>
                    <Item onClick={() => hashHistory.push('/personalcenter/about?title=关于我们')}>
                        <ListContent
                            type="small"
                            icon="about16"
                            text="关于我们"
                        ></ListContent>
                    </Item>
                </List>

                {/*<List>*/}
	                {/*<Item onClick={() => hashHistory.push('/personalcenter/walletmanage?title=钱包管理')}>钱包管理</Item>*/}
	            {/*</List>*/}
	            {/*<List>*/}
	                {/*<Item onClick={() => hashHistory.push('/personalcenter/about?title=关于我们')}>关于我们</Item>*/}
	            {/*</List>*/}
	            {/*<List>*/}
	                {/*<Item onClick={() => hashHistory.push('/personalcenter/help?title=帮助中心')}>帮助中心</Item>*/}
	            {/*</List>*/}

			</div>
		);
	}
}

export default personalCenterHome