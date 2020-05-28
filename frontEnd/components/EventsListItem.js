import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Image, Text, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'
import { useSelector, useDispatch } from 'react-redux'
import * as eventDataActions from '../store/actions/eventData'

import Card from './Card'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const EventsListItem = props => {
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  // Fetch data about all events and list it

  const fetchAllEventData = () => {
    console.log('Action dispatched for fetching ALL data!')
    dispatch(eventDataActions.fetchAllData(props.eventId))
  }

  return (
    <Card style={styles.card}>
      <TouchableComponent
        style={styles.touchable}
        onPress={() => {
          fetchAllEventData()
          // ToDo: While loading, display activity indicator
          props.navigation.navigate('MainScreen')
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: props.eventImage }}
            style={styles.image}
            resizeMode='contain'
          />
          <Text>{props.eventName}</Text>
        </View>
      </TouchableComponent>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    height: Dimensions.get('window').width / 100 * 45,
  },
  touchable: {
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    padding: 10,
  },
  image: {
    width: '80%',
    height: '80%'
  }
})

export default withNavigation(EventsListItem)


