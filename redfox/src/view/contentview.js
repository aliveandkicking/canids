import React, { Component } from 'react'
import {View, StyleSheet} from 'react-native'
import DayNavigatorView from './daynavigatorview'

export default class ContentView extends Component {
  render () {
    return (
      <View style={contentViewStyles.container}>
        <DayNavigatorView />
      </View>
    )
  }
}

const contentViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#FFFFCC'
  }
})
