import React, { Component } from 'react'
import {View} from 'react-native'
import HeaderView from './headerview'
import ContentView from './contentview'

export default class RootView extends Component {
  render () {
    return (
      <View style={{
        flex: 1,
        alignItems: 'stretch'}}>
        <HeaderView />
        <ContentView />
      </View>
    )
  }
}
