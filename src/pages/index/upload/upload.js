import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import front from './images/icon_id_front.png'
import back from './images/icon_id_back.png'
import auth from './images/icon_huanbei_auth.png';
import reTakePhoto from './images/icon_re_take_photo.png';
import takePhoto from './images/icon_take_photo.png'
import './upload.scss'



export default class Upload extends Component {

  handleUpload = () => {
    let self = this;
    Taro.chooseImage({
      count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function (res) {
          let value = res && res.tempFilePaths[0];
          self.setState({
            value: value,
            recognized: !!(value),
          });
          // let detail = {
          //   value,
          // };
          // self.triggerEvent('onUpload', detail)
        }
    })
  }

  render () {
    const { value } = this.state;
    const { verified, isFront } = this.props;
    const { recognized } = this.state;
    let content = null;
    if(recognized && verified) {
      // 识别成功且验证成功，只显示认证图片
      content = (
        <view className="content">
          <image className="auth-icon" src={auth} />
        </view>
      )
    } else if(recognized && !verified) {
      // 识别成功，显示认证图片和重拍按钮
      content = (
        <view className="content">
          <image className="auth-icon" src={auth} />
          <image className="take-icon" src={reTakePhoto} />
        </view>
      )
    } else {
      content = (
        <view className="content">
          <Image src={takePhoto} className="take-icon" />
          <Text className="tips">
            {
              isFront
              ? '请拍摄身份证正面'
              : '请拍摄身份证反面'
            }
          </Text>
      </view>
      )
    }
    return (
      <View className="upload" onClick={this.handleUpload}>
        {
          value
          ?
          <view>
            <Image src={value} className="background" />
          </view>
          :
          <view>
            <Image src={isFront ? front : back} className="background" />
            <View className="mask" />
          </view>
        }
        { content }
      </View>
    )
  }
}
