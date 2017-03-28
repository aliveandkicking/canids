import React, { Component } from 'react'
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native'
import {dateUtils} from '../model/dateutils'

const DAY_NAMES = ['MO', 'TU', 'WE', 'TH', 'FR', 'SA', 'SU']

const getNormalizedDayOfWeek = function (date) {
  let dayOfWeek = date.getDay()
  if (dayOfWeek === 0) {
    return 6
  } else {
    return --dayOfWeek
  }
}

const RanderDayOfWeek = (props) => (
  <TouchableHighlight
    style={getDayOfWeekTouchableContainerStyle(props.date)}
    onPress={() => props.onClick(props.date)}>
    <View style={dayNavigatorBarViewStyles.dayOfWeekContainer}>
      <Text style={dayNavigatorBarViewStyles.dayOfWeek}>
        {DAY_NAMES[getNormalizedDayOfWeek(props.date)]}
      </Text>
      <Text style={[dayNavigatorBarViewStyles.dateOfWeek]}>
        {props.date.getDate()}
      </Text>
    </View>
  </TouchableHighlight>
)

export default class DayNavigatorBarView extends Component {
  randerContent () {
    let daysOfWeek = []
    let startDate = new Date(this.props.startDate.getTime() -
      (getNormalizedDayOfWeek(this.props.startDate) * dateUtils.MILISECONDS_IN_DAY))

    for (let i = 0; i < DAY_NAMES.length; i++) {
      daysOfWeek.push(<RanderDayOfWeek
        key={i}
        date={new Date(startDate.getTime() + (dateUtils.MILISECONDS_IN_DAY * i))}
        onClick={this.props.onClick} />)
    }
    return daysOfWeek
  }

  render () {
    return (
      <View style={dayNavigatorBarViewStyles.dayNavigatorBarView}>
        {this.randerContent()}
      </View>
    )
  }
}

let getDayOfWeekTouchableContainerStyle = function (date) {
  if (dateUtils.isToday(date)) {
    return [dayNavigatorBarViewStyles.dayOfWeekTouchableContainer, {backgroundColor: '#CCEE00'}]
  } else {
    return dayNavigatorBarViewStyles.dayOfWeekTouchableContainer
  }
}

const dayNavigatorBarViewStyles = StyleSheet.create({
  dayNavigatorBarView: {
    height: 70,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
    backgroundColor: '#0055CC'
  },
  dayOfWeekTouchableContainer: {
    flex: 1
  },
  dayOfWeekContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'stretch'
  },
  dayOfWeek: {
    flex: 1,
    textAlign: 'center'
  },
  dateOfWeek: {
    flex: 1,
    textAlign: 'center'
  }
})
