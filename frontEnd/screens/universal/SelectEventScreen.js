import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'

import LoadingIndicator from '../../components/Universal/LoadingIndicator'

import * as eventDataActions from '../../store/actions/eventData'

// import eventsData from '../../data/jsonFiles/events.json'
import EventListItem from '../../components/ListItems/EventsListItem'

const SelectEventScreen = props => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()

  //_____ Initially load data from server to Redux
  useEffect(() => {
    dispatch(eventDataActions.fetchEventMetaData())
    console.log('Dispatching action to fetch metadata!')
  }, [])

  //_____ Fetch data from Redux _____
  const eventsMetaData = useSelector(state => state.eventData.eventsMetaData)
  console.log(eventsMetaData)

  // _____ On back navigation, reload data and refresh page
  useEffect( () => {
    props.navigation.addListener('didFocus', () => {
      setIsLoading(true)
      dispatch(eventDataActions.fetchEventMetaData())
      setIsLoading(false)
      console.log('Go back pressed, reloading data again!')
    })
  },[])

  if (isLoading === true) {
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
