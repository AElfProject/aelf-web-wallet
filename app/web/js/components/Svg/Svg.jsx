/*
 * huangzongzhe
 * 2018.10.09
 */
import React, {
    Component
} from 'react'
import svgslist from '../../../assets/svgs'
import ReactSVG from 'react-svg'

class Svg extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let icon = this.props.icon;
        let svg = svgslist[icon];
        return (
            <div
                style={{height: 18, width: 18}}
                dangerouslySetInnerHTML={{__html: svg}}
                {...this.props}
            />
        );
    }
}

export default Svg
