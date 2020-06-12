import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Rating } from 'react-native-elements'

import Card from '../../components/Universal/Card'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const MarkerCalloutHotel = props => {
  const name = props.name
  const rating = props.rating

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text>{name}</Text>
      </View>
      <View style={styles.header}>
        <Rating
          imageSize={16}
          fractions={1}
          startingValue={rating}
        />
      </View>
      <View style={styles.calloutButtonRow}>
        <Card style={styles.buttonInCallout}>
          <TouchableComponent
            // onPress={showAlert}
            style={styles.container}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-information' : 'ios-information'}
              size={Dimensions.get('window').width / 100 * 10}
              color={Colors.primary}
            />
          </TouchableComponent>
        </Card>
        <Card style={styles.buttonInCallout}>
          <TouchableComponent
            // onPress={showAlert}
            style={styles.container}
          >
            <Ionicons
              name={Platform.OS === 'android' ? 'md-car' : 'ios-car'}
              size={Dimensions.get('window').width / 100 * 10}
              color={Colors.primary}
            />
          </TouchableComponent>
        </Card>

      </View>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    margin : 4,
  },
  calloutButtonRow: {
    flex: 1,
    flexDirection: 'row',
  },
  buttonInCallout: {
    flex: 1,
    height: Dimensions.get('window').width / 100 * 12,
    aspectRatio: 1,
    margin: 5,
  }
})

export default MarkerCalloutHotel

