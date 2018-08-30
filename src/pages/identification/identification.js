import Taro, { Component } from '@tarojs/taro'
import { View, Text } from '@tarojs/components'
import Upload from './upload/upload'
import Info from './info/info'

import './identification.scss'

export default class identification extends Component {

  config = {
    navigationBarTitleText: '首页'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onRedirectTo = () => {
    Taro.redirectTo({
      url: '/pages/lend/lend'
    })
  }

  onUpload = (file, isFront, e) => {
    e.preventDefault();
    console.log('isFront', file, isFront, e);
    if (isFront) {
      this.setState({
        frontVal: file,
      })
    } else {
      this.setState({
        backVal: file,
      })
    }
  }

  render () {
    const { frontVal, backVal } = this.state;
    return (
      <View className='identification'>
        <Text className="title">请拍摄身份证正反面</Text>
        <View className="upload-area">
          <Upload isFront onUpload={this.onUpload} value={frontVal} />
          <Upload onUpload={this.onUpload} value={backVal} />
        </View>
        <Info isFront recognized verified defaults={{}} />
        <Info recognized defaults={{}} />
        <Button onClick={this.onRedirectTo} txt="下一步" className="spacing" />
      </View>
    )
  }
}

