import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const MapCalloutRestaurant = props => {
  const name = props.name
  const category = props.category
  const address = props.address

  return (
    <View style={styles.navigationButton}>
      <TouchableComponent
        style={styles.container}
        onPress={() => this.MapView.animateToCoordinate({
          latitude: lat,
          longitude: long,
        }, animationTime)}
      >
        <Ionicons
          name={Platform.OS === 'android' ? `md-${iconName}` : `ios-${iconName}`}
          size={Dimensions.get('window').width / 100 * 10}
          color={Colors.primary}
        />
      </TouchableComponent>
    </View>

  )
}

const styles = StyleSheet.create({
 

})

export default MapCalloutRestaurant

