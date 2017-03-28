import {StyleSheet} from 'react-native'

export const taskListViewStyles = StyleSheet.create({
  root: {
    flex: 1
  },
  header: {
    height: 40,
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  closeButton: {
    height: 36,
    width: 36,
    borderRadius: 18,
    borderWidth: 0.5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  listView: {
    flex: 1
  },
  taskListItem: {
    flex: 1,
    backgroundColor: '#555500',
    borderWidth: 1,
    height: 50,
    alignItems: 'stretch'
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
})
