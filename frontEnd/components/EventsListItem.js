import React from 'react'
import { View, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Image, Text } from 'react-native'
import { withNavigation } from 'react-navigation'

import Card from './Card'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const EventsListItem = props => {

  // Fetch data about all events and list it
  const imageUrl = props.eventImage

  return (
    <Card style={styles.card}>
      <TouchableComponent
        style={styles.touchable}
        onPress={() => {
          // Fetch all Data from server about selected event
          props.navigation.navigate('MainScreen')
        }}
      >
        <View style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
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


