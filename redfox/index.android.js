import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import RootView from './src/view/rootview'
import Model from './src/model/model'

export default class redfox extends Component {
  constructor (props) {
    super(props)
    this.model = new Model()
  }

  componentWillUnmount () {
    this.model.unInit()
  }

  render () {
    // let start = new Date()
    // for (var i = 0; i < 1000000; i++) {
    //    let Obj = {name: 'Some name'}
    // }
    // console.log('time:', ((new Date()).getTime() - start.getTime()) / 100)

    return (
      <RootView />
    )
  }
}

AppRegistry.registerComponent('redfox', () => redfox)
