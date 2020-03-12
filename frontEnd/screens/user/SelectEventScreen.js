import React from 'react'
import { View, FlatList } from 'react-native'

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
    headerBackTitle: null
  }
}

export default SelectEventScreen