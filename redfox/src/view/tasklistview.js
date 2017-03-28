import React, { Component } from 'react'
import {View, Text, ListView, TextInput, TouchableHighlight} from 'react-native'
import {request} from '../model/messages/messages'
import {taskListViewStyles} from './styles/tasklistview.style.js'

const TaskListItemView = function (props) {
  return (
    <TouchableHighlight
      style={taskListViewStyles.taskListItem}
      onPress={() => props.onPress(props.task.id)}>
      <View style={taskListViewStyles.taskListItem}>
        <Text>{`${props.task.id} - ${props.task.name}`}</Text>
      </View>
    </TouchableHighlight>
  )
}

export default class TaskListView extends Component {
  constructor (props) {
    super(props)
    this.fulltaskList = request.getFullTaskList.send(null, [])
    let dataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1.id !== r2.id})
    this.state = { dataSource: dataSource.cloneWithRows(this.getTaskIndexArray()) }
  }

  getTaskIndexArray () {
    let result = []
    for (let i = 0; i < this.fulltaskList.length; i++) {
      result.push(i)
    }
    return result
  }

  render () {
    return (
      <View style={taskListViewStyles.root}>
        <View style={taskListViewStyles.header}>
          <TouchableHighlight
            style={taskListViewStyles.closeButton}
            onPress={this.props.onClose}>
            <View>
              <Text style={{fontSize: 18}}>X</Text>
            </View>
          </TouchableHighlight>
        </View>
        <TextInput
          style={taskListViewStyles.textInput}
          onChangeText={() => {}}
          defaultValue={'text to search'}
        />
        <ListView
          style={taskListViewStyles.listView}
          dataSource={this.state.dataSource}
          renderRow={(rowData) =>
            <TaskListItemView
              task={this.fulltaskList[rowData]}
              onPress={this.props.onTaskClick}
            />}
        />
      </View>
    )
  }
}
