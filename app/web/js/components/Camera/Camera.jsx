/*
 * huangzongzhe
 * 2018.10.15
 */
import React, {
    Component
} from 'react';

import { Toast } from 'antd-mobile'

class Camera extends Component {
    constructor(props) {
        super(props);
    }

    componentDidMount () {
        this.initCamera()
        let context = this.show.getContext('2d')

        // 绑定事件
        // this.getCamera.addEventListener('click', () => {
        //     context.drawImage(this.vide, 0, 0, 480, 320)
        // })
        document.getElementById('clickMe').addEventListener('click', () => {
            context.drawImage(this.vide, 0, 0, 380, 220)
        });
    }

    initCamera () {
        // 区分前后摄像头
        // const {
        //     devicePosition
        // } = this.props
        const devicePosition = 'front'
        let device
        if (devicePosition === 'front') {
            device = 'user'
        } else {
            device = 'environment'
        }

        if (navigator.mediaDevices.getUserMedia || navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia) {
            // 调用用户媒体设备，访问摄像头
            this.getUserMedia({
                audio: true,
                video: { facingMode: device }
            }, (stream) => {
                // 兼容webkit内核浏览器
                let CompatibleURL = window.URL || window.webkitURL
                this.vide.src = CompatibleURL.createObjectURL(stream)
                // 播放视频
                this.vide.play()
            }, (error) => {
                Toast.fail(`erro ${error}`);
                console.log('error: ', error);
                // if (error.name === 'NotAllowedError') {
                //     this.props.binderror(error)
                // } else {
                //     this.props.bindstop(error)
                // }
            })
        } else {
            Toast.fail(`你的浏览器不支持访问用户媒体设备`);
            // alert('你的浏览器不支持访问用户媒体设备')
        }
    }

    // 访问用户媒体设备的兼容方法
    getUserMedia (constrains, success, error) {
        if (navigator.mediaDevices.getUserMedia) {
            // 最新标准API
            navigator.mediaDevices.getUserMedia(constrains).then(success).catch(error)
        } else if (navigator.webkitGetUserMedia) {
            // webkit内核浏览器
            navigator.webkitGetUserMedia(constrains).then(success).catch(error)
        } else if (navigator.getUserMedia) {
            // 旧版API
            navigator.getUserMedia(constrains).then(success).catch(error)
        }
    }

    render() {
        return (
            <div>
                <button id='clickMe'>clickMe</button>
                <video id='video' autoPlay style={{width: '380px',height: '220px'}} ref={(vide) => { this.vide = vide }} />
                <canvas
                    id='canvas'
                    width='380'
                    height='220'
                    ref={(show) => { this.show = show }} />
            </div>
        )
    }
}

export default Camera;