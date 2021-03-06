import React from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Image, Text, ActivityIndicator } from 'react-native'
import { withNavigation } from 'react-navigation'

import Card from '../Universal/Card'
import serverURL from '../../constants/Networking'
import ImageWithLoadingIndicator from '../Universal/ImageWithLoadingIndicator'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const EventsListItem = props => {
  const eventId = props.eventId
  const eventName = props.eventName
  const eventImage = props.eventImage

  return (
    <Card style={styles.card}>
      <TouchableComponent
        style={styles.touchable}
        onPress={() => {
          props.navigation.navigate('PasswordScreen', {
            eventId: eventId,
            eventName: eventName
          })
        }}
      >
        <View style={styles.imageContainer}>
          <ImageWithLoadingIndicator 
            source={`${serverURL}/public/${eventId}/${eventImage}`}
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


