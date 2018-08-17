import Taro, { Component } from '@tarojs/taro'
import { View, Text, Button } from '@tarojs/components'

export default class Entry extends Component {

  config = {
    navigationBarTitleText: '登录'
  }

  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  onRedirectTo = () => {
    Taro.redirectTo({
      url: '/pages/index/index'
    })
  }

  render () {
    return (
      <View className='index'>
        <Text>登录页</Text>
        <Button onClick={this.onRedirectTo}>跳转到身份证页面</Button>
      </View>
    )
  }
}

