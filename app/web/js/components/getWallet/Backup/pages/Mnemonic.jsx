/*
 * huangzongzhe
 * 2018.08.28
 */
// Demo
// <Mnemonic 
//    navTitle="备份助记词" 
//    mnemonic={this.state.mnemonic} // [String]
//    display={this.state.mnemonicDisplay} // [Bool]
//    onLeftClick={() => this.toggleMnemonic()}>
// </Mnemonic>;
// toggleMnemonic() {
//     this.setState({
//         mnemonicDisplay: !this.state.mnemonicDisplay
//     });
// }

import React, {
	Component
} from 'react'
import { NavBar, Icon, Button, Toast } from 'antd-mobile'
import { hashHistory } from 'react-router'
import style from './pages.scss'

const selectedStyle = '#EEE';
const unSelectedStyle = '#FFF';

class Mnemonic extends Component {
	constructor(props) {
		super(props);
		this.state = {
			confirmDisplay: false,
			mnemonicConfirmed: []
		};

		this.setMnemonicDisorderedListStyle();

		// 拿到助记词并打乱顺序。
		this.list = this.props.mnemonic.split(' ').sort(function() {
		    return .5 - Math.random();
		});

		this.itemCheck = [];
		this.mnemonicDisordered = [];
	}

	setMnemonicDisorderedListStyle() {
		let mnemonicDisorderedListStyle = [];
		for (let i = 0; i < 12; i++) {
			mnemonicDisorderedListStyle.push({
				background: unSelectedStyle
			});
		}
		this.state.mnemonicDisorderedListStyle = mnemonicDisorderedListStyle;
	}

	toggleConfirm() {
		this.setState({
			confirmDisplay: !this.state.confirmDisplay
		});
	}

	disorderedItemClick(e) {
		let text = e.target.innerText;

		let indexDisorderedItem = parseInt(e.target.getAttribute('index'), 10);
		let index = this.state.mnemonicConfirmed.length;

		if (this.itemCheck.indexOf(indexDisorderedItem) < 0) {
			this.itemCheck.push(indexDisorderedItem);
			this.state.mnemonicDisorderedListStyle[indexDisorderedItem] = {
				background: selectedStyle
			};
			let mnemonicConfirmed = this.state.mnemonicConfirmed;
			mnemonicConfirmed.push(<div 
					className={style.listItem} 
					key={Math.random()}
					index={index}
					indexdisordereditem={indexDisorderedItem}
					onClick={(e) => this.removeItem(e)}
					>{text}</div>);

			this.setState({
				mnemonicConfirmed: mnemonicConfirmed
			});
		}
	}

	confirm() {
		// 确认是否OK
		if (this.itemCheck.length === 12) {
			let text = '';
			this.itemCheck.map(item => {
				text += this.mnemonicDisordered[item] + ' ';
			});

			if (text.trim() === this.props.mnemonic) {
				Toast.success('正确', 3, () => {
					hashHistory.push('/personalcenter/walletmanage');
				});
				return;
			}
		}
		Toast.fail('请重新温习助记词。', 2, () => {}, false);
	}

	// 从确认框中点击单词并移除
	removeItem(e) {
		let indexDisorderedItem = parseInt(e.target.getAttribute('indexdisordereditem'), 10);
		let index = parseInt(e.target.getAttribute('index'), 10);

		let indexItemCheck = this.itemCheck.indexOf(indexDisorderedItem);
		if (indexItemCheck >= 0) {
			this.state.mnemonicDisorderedListStyle[indexDisorderedItem] = {
				background: unSelectedStyle
			};
			this.itemCheck.splice(indexItemCheck, 1);

			let mnemonicConfirmed = this.state.mnemonicConfirmed;
			mnemonicConfirmed[index] = '';

			this.setState({
				mnemonicConfirmed: mnemonicConfirmed
			});
		}
	}

	getMnemonicDisorderedHtml() {
		let mnemonicDisorderedHtml = [];
		let mnemonicDisordered = [];
		this.list.map((item, index) => {
			mnemonicDisorderedHtml.push(<div 
				className={style.listItem} 
				key={Math.random()}
				index={index}
				style={this.state.mnemonicDisorderedListStyle[index]}
				onClick={(e) => this.disorderedItemClick(e)}
				>{item}</div>);
			mnemonicDisordered.push(item);
		});
		this.mnemonicDisordered = mnemonicDisordered;
		return mnemonicDisorderedHtml;
	}

	getContainerStyle() {
		let containerStyle = {
			display: this.props.display ? 'block' : 'none'
		};

		let confirmContainerStyle = {
			display: this.state.confirmDisplay ? 'block' : 'none'
		};
		return {
			containerStyle: containerStyle,
			confirmContainerStyle: confirmContainerStyle
		};
	}

	render() {

		let mnemonicDisorderedHtml = this.getMnemonicDisorderedHtml();
		let { containerStyle,confirmContainerStyle } = this.getContainerStyle();

		return (
			<div>
				<div className={style.page} style={containerStyle}>
					<div className={style.container}>
						<NavBar 
							icon={<Icon type="left" />}
							onLeftClick={() => this.props.onLeftClick()}
							style={{position: 'fixed', top: '0px', left: '0px', width: '100%'}}>
							{this.props.navTitle}
						</NavBar>
						<div className={style.whitespace}></div>
						<div className={style.note}>
							<p>
								助记词用于恢复钱包或者重置钱包密码，仔细抄写下助记词并放在安全的地方！请勿截图，如果有他人获取你的助记词，他将直接获取你的资产
							</p>
						</div>
						<div className={style.privateContainer}>
							{this.props.mnemonic}
						</div>
						<Button onClick={() => this.toggleConfirm()}>下一步</Button>
					</div>
				</div>

				<div className={style.page} style={confirmContainerStyle}>
					<div className={style.container}>
						<NavBar 
							icon={<Icon type="left" />}
							onLeftClick={() => this.toggleConfirm()}
							style={{position: 'fixed', top: '0px', left: '0px', width: '100%'}}>
							{this.props.navTitle}
						</NavBar>
						<div className={style.whitespace}></div>
						<div>请按顺序点击助记词，以确认您正确备份。</div>
						<div className={style.privateContainer}>
							{this.state.mnemonicConfirmed}
						</div>
						{mnemonicDisorderedHtml}
						<Button onClick={() => this.confirm()}>确认</Button>
					</div>
				</div>
			</div>
		);
	}
}

export default Mnemonic