import React, { Component } from 'react'
import {View, StyleSheet, Text} from 'react-native'

export default class TaskView extends Component {

  render () {
    return (
      <View style={taskViewStyles.root}>
        <Text style={{flex: 1}}>{this.props.task.name}</Text>
      </View>
    )
  }
}

const taskViewStyles = StyleSheet.create({
  root: {
    backgroundColor: '#55CC00',
    borderWidth: 1,
    height: 80,
    alignItems: 'stretch'
  }
})
