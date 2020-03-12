import React, { useEffect } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import * as eventDataActions from '../../store/actions/eventData'

// import eventsData from '../../data/jsonFiles/events.json'
import EventListItem from '../../components/EventsListItem'

const SelectEventScreen = props => {
  const eventsData = useSelector(state => state.eventData.eventsMetaData)
  const dispatch = useDispatch()

  console.log(eventsData)

  useEffect(() => {
    dispatch(eventDataActions.fetchEventMetaData())
    console.log('Action dispatched for fetching new data!')
  }, [dispatch])

 
  return (
    <View>
      <FlatList
        data={eventsData}
        extraData={eventsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={eventsData =>
          <EventListItem
            eventId={eventsData.item.id}
            eventName={eventsData.item.name}
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