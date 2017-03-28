import React, { Component } from 'react'
import {View, Text, TouchableHighlight, ScrollView} from 'react-native'
import TaskView from './taskview'
import TaskListView from './tasklistview'
import {request, notification} from '../model/messages/messages'
import {dayViewStyles} from './styles/dayview.style'
import {dateUtils} from '../model/dateutils'

export default class DayView extends Component {
  constructor (props) {
    super(props)
    this.state = {sideTaskListMenuVisible: false}

    this.showSideTaskList = this.showSideTaskList.bind(this)
    this.hideSideTaskList = this.hideSideTaskList.bind(this)
    this.addTask = this.addTask.bind(this)
    this.onTaskDateChanged = this.onTaskDateChanged.bind(this)

    notification.taskDatesChanged.subscribe(this.onTaskDateChanged)
  }

  componentWillUnmount () {
    notification.taskDatesChanged.unSubscribe(this.onTaskDateChanged)
  }

  onTaskDateChanged (data) {
    if (data) {
      if (data.date) {
        if (dateUtils.sameDay(this.props.date, data.date)) {
          this.forceUpdate()
        }
      }
    }
  }

  showSideTaskList () {
    this.setState({sideTaskListMenuVisible: true})
  }

  hideSideTaskList () {
    this.setState({sideTaskListMenuVisible: false})
  }

  addTask (id) {
    if ((id === null) || (id === undefined)) {
      return
    }
    notification.attempToAddDateToTask.send({
      taskId: id,
      date: this.props.date
    })
  }

  randerTasks () {
    const taskList = request.getTaskListByDate.send(this.props.date)
    if (!taskList) {
      console.warn('DayView: task list is not assigned')
      return null
    }
    let tasks = []
    for (let i = 0; i < taskList.length; i++) {
      tasks.push(<TaskView key={i} task={taskList[i]} />)
    }
    return tasks
  }

  randerBottomPart () {
    return (
      <View style={dayViewStyles.bottomPart}>
        <TouchableHighlight
          style={dayViewStyles.addTaskButton}
          onPress={this.showSideTaskList}>
          <View>
            <Text style={{fontSize: 50}}>+</Text>
          </View>
        </TouchableHighlight>
      </View>
    )
  }

  randerSideTaskListMenu () {
    if (!this.state.sideTaskListMenuVisible) {
      return
    } else {
      return (
        <View style={dayViewStyles.sideTaskListMenu}>
          <TaskListView
            onClose={this.hideSideTaskList}
            onTaskClick={this.addTask}
          />
        </View>
      )
    }
  }

  render () {
    return (
      <View style={dayViewStyles.root}>
        <ScrollView style={dayViewStyles.scrollView}>
          <View style={dayViewStyles.taskRoot}>
            {this.randerTasks()}
            {this.randerBottomPart()}
          </View>
        </ScrollView>
        {this.randerSideTaskListMenu()}
      </View>
    )
  }
}
