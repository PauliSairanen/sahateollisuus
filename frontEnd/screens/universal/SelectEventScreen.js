import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Alert } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { withNavigation } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'

import LoadingIndicator from '../../components/Universal/LoadingIndicator'
import * as eventDataActions from '../../store/actions/eventData'

// import eventsData from '../../data/jsonFiles/events.json'
import EventListItem from '../../components/ListItems/EventsListItem'

const SelectEventScreen = props => {
  const userEmail= useSelector(state => state.eventData.email)
  const loadedMetadata = useSelector(state => state.eventData.eventsMetaData)

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  let lastScreen = props.navigation.getParam('lastScreen')

  const reloadData = async () => {
    console.log('Reloading metadata')
    setError(null)
    setIsLoading(true)
    try {
      // Dispatch action to check if email exists and load events based on email
      await dispatch(eventDataActions.fetchMetadataByEmail(userEmail))
      setIsLoading(false)
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
    }
  }

  // If screen is accessed from Main Nav Screen, Data is loaded again
  useEffect(() => {
    console.log('The last screen is ' + lastScreen)
    if (lastScreen === 'MainNavigationScreen') {
      reloadData()
    }
  }, [lastScreen])
 
  // _____ Function for fetching metadata

  useEffect(() => {
    if (error) {
      Alert.alert('Login failed', error, [{ text: 'Okay' }])
    }
  }, [error])

  if (isLoading) {
    return (
      <LoadingIndicator />
    )
  } else {
    return (
      <View>
        <LinearGradient colors={['orange', 'yellow']} style={styles.gradient}>
          <FlatList
            data={loadedMetadata}
            extraData={loadedMetadata}
            keyExtractor={(item, index) => index.toString()}
            renderItem={array =>
              <EventListItem
                eventId={array.item.id}
                eventName={array.item.name}
                eventImage={array.item.eventImage}
              />
            }
          />
        </LinearGradient>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
  },
})

export default withNavigation(SelectEventScreen)
