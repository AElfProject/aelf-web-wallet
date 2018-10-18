/*
 * huangzongzhe
 * 2018.10.15
 */
import React, {
    Component
} from 'react';
import { Button } from 'antd-mobile';
import Svg from '../Svg/Svg';
import style from './Button.scss';

class AelfButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {

        let svgStyle = {
            padding: '3px 12px 0 0',
            display: this.props.aelficon ? 'block': 'none',
        };
        return (
            <Button {...this.props} className={style.btn}>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={svgStyle}>
                        <Svg icon={this.props.aelficon}
                             style={{ display: 'inline-block', height: 20, width: 20}}></Svg>
                    </div>
                    <div>{this.props.text || ''}</div>
                </div>
            </Button>
        );
    }
}

export default AelfButton;