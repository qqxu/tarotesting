import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text, Input, Button } from '@tarojs/components'
import certified from './images/icon_certified.png'

import './info.scss'

export default class info extends Component {
  constructor(props) {
    super(props);
    this.state = {valDisabled: true};
  }

  handleUpload = () => {
    Taro.chooseImage && Taro.chooseImage({
      count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function (res) {
          let val = res && res.tempFilePaths[0];
          this.props.onUpload && this.props.onUpload(val, this.props.isFront);
        }
    })
  }

  handleIptUpload = (e) => {
    const files = e && e.target.files;
    const file = files && files[0];
    this.getBase64File(file).then(val => {
      this.props.onUpload && this.props.onUpload(val, this.props.isFront);
    }).catch(e => {
      console.log(e);
    })
  }

  getBase64File = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  onClick = () => {
    this.setState({
      valDisabled: false,
    })
  }

  render () {
    const { valDisabled } = this.state;
    const { verified, isFront, recognized, defaults } = this.props;
    let content = null;
    if(recognized && verified) {
      // 识别成功且验证成功，加认证图片
      content = (
        <View className={`info-box${isFront ? ' bottom-line' : ''}`} >
          <Image className="icon" src={certified} />
          <Text className="value">{defaults.column1 || '张爱华'}</Text>
          <Text className="value space">{defaults.column2 || '1736378499440'}</Text>
          <Text className="tips">{ isFront ? '请核对您的姓名和身份证号码' : '请核对签发机关和有效期'}</Text>
        </View>
      )
    } else if(recognized && !verified) {
      // 识别成功，显示认证图片和重拍按钮
      content = (
        <View className={`info-box${isFront ? ' bottom-line' : ''}`} >
          <View className="name-box">
            <Input className="value" value={defaults.column1 || '张爱华'} disabled={valDisabled} focus={!valDisabled} />
            <View className="btn" onClick={this.onClick}>修改</View>
          </View>
          <Text className="value space">{defaults.column2 || '1736378499440'}</Text>
          <Text className="tips">{ isFront ? '请核对您的姓名和身份证号码' : '请核对签发机关和有效期'}</Text>
        </View>
      )
    } else {
      content = (
        <View className={`center-tips${isFront ? ' bottom-line' : ''}`} onClick={this.handleUpload}>
          {
            isFront ?
              '请点击上方按钮拍摄正面'
              :
              '请点击上方按钮拍摄反面'
          }
        </View>
      )
    }
    return (
      <View className="info">
        { content }
      </View>
    )
  }
}
