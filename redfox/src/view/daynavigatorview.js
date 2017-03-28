import React, { Component } from 'react'
import {View} from 'react-native'
import DayNavigatorBarView from './daynavigatorbarview'
import DayView from './dayview'

export default class DayNavigatorView extends Component {
  constructor (props) {
    super(props)
    this.state = {activeDate: new Date()}
  }

  goToDate (date) {
    if (date instanceof Date) {
      this.setState({activeDate: date})
    } else {
      console.warn('arg "date" is not a Date')
    }
  }

  render () {
    return (
      <View style={{
        flex: 1,
        alignItems: 'stretch'
      }}>
        <DayNavigatorBarView
          startDate={this.state.activeDate}
          onClick={this.goToDate.bind(this)} />

        <DayView date={this.state.activeDate} />

      </View>
    )
  }
}
