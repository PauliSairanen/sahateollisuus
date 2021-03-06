import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import StarRating from 'react-native-star-rating'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const HotelCallout = props => {
  const name = props.name
  const rating = props.rating

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{name}</Text>
      </View>
      <View style={styles.header}>
        <StarRating
          disabled={true}
          maxStars={5}
          rating={rating}
          fullStarColor={'gold'}
          starSize={20}
        />
      </View>
      <View style={styles.header}>
        <Text>Tap for more info</Text>
      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoButtonContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    margin: 6,
  },
  buttonInCallout: {
    flex: 1,
    height: Dimensions.get('window').width / 100 * 20,
    aspectRatio: 1,
    margin: 10,
    paddingVertical: 10,
  }
})

export default HotelCallout

