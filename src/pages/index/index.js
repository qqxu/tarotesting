import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'
import Upload from './upload/upload'
import './index.scss'

export default class Index extends Component {

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
      url: '/pages/entry/entry'
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello world!</Text>
        <view className="upload-area">
          <Upload isFront />
          <Upload isFront={false} />
        </view>
        <Button onClick={this.onRedirectTo}>下一步</Button>
      </View>
    )
  }
}

