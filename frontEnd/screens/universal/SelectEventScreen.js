import React, { useEffect, useState, useCallback } from 'react'
import { View, FlatList, StyleSheet } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

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
         <LinearGradient colors={['orange', 'yellow']} style={styles.gradient}>
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
        </LinearGradient>
      </View>
    )
  }
}

const styles= StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
  },
})

export default withNavigation(SelectEventScreen)
