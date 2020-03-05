import React from 'react'
import { View, FlatList, Text, StyleSheet } from 'react-native'

import Colors from '../../constants/Colors'

import eventsData from '../../data/jsonFiles/events.json'
import EventListItem from '../../components/EventsListItem'

const SelectEventScreen = props => {

  return (
    <View>
      <FlatList
        data={eventsData}
        extraData={eventsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={eventsData =>
          <EventListItem
            eventId={eventsData.item.id}
            eventName={eventsData.item.eventName}
            eventDescription={eventsData.item.eventDescription}
            eventImage={eventsData.item.eventImage}
          />
        }
      />
    </View>
  )
}

SelectEventScreen.navigationOptions = navData => {
  return {
    headerTitle: () => (
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitleStyle}>Select Event</Text>
      </View>)
    ,
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerTitleStyle: {
    fontFamily: 'Rubik-Bold',
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  },
})

export default SelectEventScreen