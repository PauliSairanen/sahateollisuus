import React from 'react'
import { View, StyleSheet, FlatList, Dimensions, Platform,} from 'react-native'
import { HeaderBackButton } from 'react-navigation-stack'

import NavigationTile from '../../components/ListItems/NavigationTile'
import Colors from '../../constants/Colors'
import AdjustingText from '../../components/Universal/AdjustingText'

const numberOfColumns = 2
const naviScreenData = [
  { id: 1, title: 'Programme', link: 'Programme', icon: Platform.OS === 'android' ? 'md-calendar' : 'ios-calendar' },
  { id: 2, title: 'Speakers', link: 'Speakers', icon: Platform.OS === 'android' ? 'md-microphone' : 'ios-microphone' },
  { id: 3, title: 'Sponsors', link: 'Sponsors', icon: Platform.OS === 'android' ? 'md-contacts' : 'ios-contacts' },
  { id: 4, title: 'Participants', link: 'Participants', icon: Platform.OS === 'android' ? 'md-contact' : 'ios-contact' },
  { id: 5, title: 'Venue', link: 'Venue', icon: Platform.OS === 'android' ? 'md-home' : 'ios-home' },
  { id: 7, title: 'Maps', link: 'Maps', icon: Platform.OS === 'android' ? 'md-pin' : 'ios-pin' },
  { id: 6, title: 'About', link: 'About', icon: Platform.OS === 'android' ? 'md-information-circle' : 'ios-information-circle' },
  { id: 7, title: 'Feedback', link: 'Feedback', icon: Platform.OS === 'android' ? 'md-thumbs-up' : 'ios-thumbs-up' },
  // { id: 8, title: 'invisible', link: '', icon: Platform.OS === 'android' ? '' : '' },
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

MainNavigationScreen.navigationOptions = (props) => {
  return {
    // This should be dynamic
    headerTitle: () => (
      <View style={styles.headerContainer}>
        <AdjustingText style={styles.headerTitleStyle}>Wood from Finland 2020</AdjustingText>
      </View>
    ),
    headerLeft: () => (
      <HeaderBackButton
        tintColor={Platform.OS === 'android' ? 'white' : Colors.primary}
        onPress={() => props.navigation.navigate('SelectEvent', {
          lastScreen: 'MainNavigationScreen'
        })}
      />
    )
  }
}

const styles = StyleSheet.create({
  listContainer: {
    flex: 1,
  },
  headerTitleStyle: {
    fontFamily: 'Rubik-Bold',
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  },
  item: {
    backgroundColor: '#FFB400',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 1,
    height: Dimensions.get('window').width / numberOfColumns
  },
  buttonContainer: {
    flex: 1
  }
})

export default MainNavigationScreen