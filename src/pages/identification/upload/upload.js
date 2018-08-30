import Taro, { Component } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import front from './images/icon_id_front.png'
import back from './images/icon_id_back.png'
import auth from './images/icon_huanbei_auth.png';
import reTakePhoto from './images/icon_re_take_photo.png';
import takePhoto from './images/icon_take_photo.png'
import './upload.scss'

export default class upload extends Component {

  chooseImage = () => new Promise((resolve,reject)=>{
    Taro.chooseImage && Taro.chooseImage({
        count: 1,
        sizeType: ['compressed'],
        sourceType: ['camera'],
        success: function (res) {
          const FileSystemManager = wx.getFileSystemManager();
          FileSystemManager.readFile({
            filePath: res.tempFilePaths[0],
            encoding: 'base64',
            success: function ({ data }) {
              resolve(data);
            }
          });
        },
        fail: function (err) {
          reject(err);
        }
    })
  });

  handleUpload = async () => {
      const { onUpload, isFront } = this.props;
      const data = await this.chooseImage();
      onUpload(data, isFront);
  }

  render () {
    const { verified, isFront, value, recognized } = this.props;
    let content = null;
    if(recognized && verified) {
      // 识别成功且验证成功，只显示认证图片
      content = (
        <View className="content">
          <Image className="auth-icon" src={auth} />
        </View>
      )
    } else if(recognized && !verified) {
      // 识别成功，显示认证图片和重拍按钮
      content = (
        <View className="content">
          <Image className="auth-icon" src={auth} />
          <Image className="take-icon" src={reTakePhoto} />
        </View>
      )
    } else {
      content = (
        <View className="content" onClick={this.handleUpload}>
          <Image src={takePhoto} className="take-icon" />
          <Text className="tips">
            {
              isFront
              ? '请拍摄身份证正面'
              : '请拍摄身份证反面'
            }
          </Text>
      </View>
      )
    }

    return (
      <View className="upload">
        {
          value
          ?
          <View>
            <Image src={value} className="background" />
          </View>
          :
          <View>
            <Image src={isFront ? front : back} className="background" />
            <View className="mask" />
          </View>
        }
        { content }
      </View>
    )
  }
}
