import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'

import LoadingIndicator from '../../components/LoadingIndicator'

import * as eventDataActions from '../../store/actions/eventData'

// import eventsData from '../../data/jsonFiles/events.json'
import EventListItem from '../../components/EventsListItem'

const SelectEventScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const eventsData = useSelector(state => state.eventData.eventsMetaData)
  const dispatch = useDispatch()

  // Async function for fetching data from server
  const fetchEventsFromBackend = async () => {
    console.log('Action dispatched for fetching events metadata')
    setIsLoading(true)
    await dispatch(eventDataActions.fetchEventMetaData())
    setIsLoading(false)
  }
 
   // Calls the data fetch function, when screen is entered
  // useEffect(() => {
  //   props.navigation.addListener('didFocus', () => {
  //     setIsLoading(true)
  //     console.log('Select Event screen is focused!')
  //     fetchEventsFromBackend()
  //   })
  // }, [])

  useEffect(() => {
    fetchEventsFromBackend()
  },[dispatch])

  if (isLoading == true) {
    return (
      <LoadingIndicator/>
    )
  } else {
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
}

  SelectEventScreen.navigationOptions = navData => {
    return {
      headerBackTitle: null
    }
  }

  export default SelectEventScreen
