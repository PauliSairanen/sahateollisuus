import React from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions, Platform, ScrollView } from 'react-native'

import NavigationTile from '../../components/NavigationTile'

const numberOfColumns = 2

const naviScreenData = [
  { id: 1, title: 'Participants', link: 'Participants', icon: Platform.OS === 'android' ? 'md-person' : 'ios-person' },
  { id: 2, title: 'Programme', link: 'Programme', icon: Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar' },
  { id: 3, title: 'Speakers', link: 'Speakers', icon: Platform.OS === 'android' ? 'md-megaphone' : 'ios-megaphone' },
  { id: 4, title: 'About', link: 'About', icon: Platform.OS === 'android' ? 'md-information-circle' : 'ios-information-circle' },
  { id: 5, title: 'Sponsors', link: 'Sponsors', icon: Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts' },
  { id: 6, title: 'invisible', link: 'blank', icon: Platform.OS === 'android' ? '' : '' },
]

const MainNavigationScreen = props => {
  return (
    <View style={styles.listContainer}>
      <FlatList
        data={naviScreenData}
        numColumns={numberOfColumns}
        renderItem={itemData =>
          <NavigationTile
            title={itemData.item.title}
            iconName={itemData.item.icon}
            navigationLink={itemData.item.link}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  item: {
    backgroundColor: '#FFB400',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    height: Dimensions.get('window').width / numberOfColumns
  },
})

export default MainNavigationScreen