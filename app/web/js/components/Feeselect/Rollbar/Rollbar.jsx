/** @file
 *  @author zhouminghui
 *  2018.11.20
 *  Code formatting completed
 */

import React from 'react';
import {FormattedMessage} from 'react-intl';

import DefaultBar from '../DefaultBar/DefaultBar';
import SelectBar from '../SelectBar/SelectBar';

import style from './RollBar.scss';

export default class RollBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            barwidth: 0,
            initialize: 0,
            marginleft: 0,
            rate: this.props.rate,
            unitprice: 0
        };
    }

    componentDidMount() {
        const selectBarWidth = this.refs.selectbar.clientWidth;
        const marginLeft = ((selectBarWidth - 80) / 40.0);
        const barWidth = 20 * (marginLeft + 2);
        const unitprice = this.state.rate * 20;
        this.setState({
            initialize: selectBarWidth,
            barWidth: barWidth,
            marginLeft: marginLeft,
            unitprice: unitprice
        });
    }

    Clickhotsport(e) {
        let touchList = e.touches[0];
        let touchClientX = touchList.clientX - this.refs.selectbar.offsetLeft;
        if (touchClientX != null && touchClientX > 0 && touchClientX < this.state.initialize) {
            touchClientX = touchClientX.toFixed(3);
            let scrollLeft = parseInt(touchClientX / (this.state.marginLeft + 2), 10) * (this.state.marginLeft + 2);
            let unitprice = this.state.rate * (parseInt(touchClientX / (this.state.marginLeft + 2), 10) + 1);
            this.setState({
                barWidth: scrollLeft,
                unitprice: unitprice
            });
        }
    }

    render() {
        return (
            <div>
                <div
                    className={style.barbox}
                    onTouchStart={this.Clickhotsport.bind(this)}
                    ref='selectbar'
                    onTouchMove={this.Clickhotsport.bind(this)}
                >
                    <DefaultBar marginLeft={this.state.marginLeft} />
                    <div
                        className={style.Selectmv}
                        style={{left: this.state.barWidth}}>
                    </div>
                    <div
                        className={style.SelectbarContainer}
                        style={{width: this.state.barWidth}}
                    >
                        <SelectBar
                            initialize={this.state.initialize}
                            marginLeft={this.state.marginLeft}
                        />
                    </div>
                </div>
                <div className={style.speed} >
                    <FormattedMessage id='aelf.slow' />
                    <FormattedMessage id='aelf.fast' /></div>
                <div className={style.fee}>{this.state.unitprice}aelf</div>
            </div>
        );
    }
}
