import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'


import LoadingIndicator from '../../components/LoadingIndicator'

import * as eventDataActions from '../../store/actions/eventData'

// import eventsData from '../../data/jsonFiles/events.json'
import EventListItem from '../../components/EventsListItem'

const SelectEventScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(eventDataActions.fetchEventMetaData())
    console.log('Dispatching action to fetch metadata!')
  }, [])

  const eventsMetaData = useSelector(state => state.eventData.eventsMetaData)
  console.log(eventsMetaData)

  // Async function for fetching data from server
  // const fetchEventsFromBackend = async () => {
  //   console.log('Action dispatched for fetching events metadata')
  //   await dispatch(eventDataActions.fetchEventMetaData())
  // }

  // useEffect(() => {
  //   fetchEventsFromBackend()
  //   props.navigation.addListener('didFocus', payload => {})
  // }, [dispatch]);



  if (isLoading == true) {
    return (
      <LoadingIndicator />
    )
  } else {
    return (
      <View>
        <FlatList
          data={eventsMetaData}
          extraData={eventsMetaData}
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
}

SelectEventScreen.navigationOptions = navData => {
  return {
    headerBackTitle: null
  }
}

export default withNavigation(SelectEventScreen)
