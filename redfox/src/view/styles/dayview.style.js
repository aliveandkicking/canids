import {StyleSheet} from 'react-native'

export const dayViewStyles = StyleSheet.create({
  root: {
    flex: 1,
    alignItems: 'stretch'
  },
  scrollView: {
    flex: 1
  },
  taskRoot: {
    flex: 1,
    alignItems: 'stretch'
  },
  bottomPart: {
    height: 300,
    alignItems: 'flex-end',
    backgroundColor: '#337799'
  },
  addTaskButton: {
    height: 100,
    width: 100,
    borderRadius: 50,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  sideTaskListMenu: {
    position: 'absolute',
    left: 100,
    right: 0,
    bottom: 20,
    top: 20,
    borderWidth: 0.5,
    backgroundColor: 'rgba(33, 180, 80, 0.95)',
    justifyContent: 'center',
    alignItems: 'stretch'
  }
})
