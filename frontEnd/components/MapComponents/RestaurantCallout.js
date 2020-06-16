import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import StarRating from 'react-native-star-rating'

import Card from '../Universal/Card'
import ButtonText from '../TextComponents/ButtonText'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const RestaurantCallout = props => {
  const name = props.name
  const category = props.category

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{name}</Text>
        <Text>{category}</Text>
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

export default RestaurantCallout

