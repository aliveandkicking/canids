import React, { Component } from 'react'
import {View, Text} from 'react-native'

export default class HeaderView extends Component {
  render () {
    return (
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'stretch',
        backgroundColor: '#FFFF00',
        height: 70
      }}>
        <Text>Feb 16 2017</Text>
      </View>
    )
  }
}
