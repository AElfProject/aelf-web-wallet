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

const Item = List.Item;
class personalCenterHome extends Component { 
	render() {
		return (
			<div className={style.container + ' ' + 'aelf-personal-pages'}>

	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/walletmanage?title=钱包管理')}>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'space-between'
                        }}>
                            <div style={{
                                display: 'flex'
                            }}>
                                <div>
                                    <Svg
                                        icon="wallet16"
                                        style={{
                                            width: 16,
                                            height: 16
                                        }}
                                    ></Svg>
                                </div>
                                <div>钱包管理</div>
                            </div>
                            <div>
                                <Svg
                                    icon="right12"
                                ></Svg>
                            </div>
                        </div>
                    </Item>
	            </List>
                <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/walletmanage?title=钱包管理')}>钱包管理</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/about?title=关于我们')}>关于我们</Item>
	            </List>
	            <List>
	                <Item onClick={() => hashHistory.push('/personalcenter/help?title=帮助中心')}>帮助中心</Item>
	            </List>
				<div>
                    <div style={{
                        display: 'flex'
                    }}>
                        <div>
							<Svg
                                icon="wallet16"
                                style={{
                                    width: 16,
                                    height: 16
                                }}
                            ></Svg>
						</div>
                        <div>钱包管理</div>
                    </div>
                    <div>
                        <div></div>
                        <div>交易记录</div>
                    </div>
					<div>blank</div>
					<div>
						<div></div>
						<div>联系人</div>
					</div>
                    <div>
                        <div></div>
                        <div>系统设置</div>
                    </div>
                    <div>
                        <div></div>
                        <div>帮助中心</div>
                    </div>
                    <div>
                        <div></div>
                        <div>关于我们</div>
                    </div>

				</div>

			</div>
		);
	}
}

export default personalCenterHome