import React from 'react'
import { View, Text, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const MapMarkerCategoryButton = props => {
  const buttonName = props.name

  return (
    <View style={styles.navigationButton}>
      <TouchableComponent
        style={styles.container}
        onPress={() => this.MapView.animateToCoordinate({
          latitude: lat,
          longitude: long,
        }, animationTime)}
      >
        <Text style={{fontSize: 10}}>
          {buttonName}
        </Text>
      </TouchableComponent>
    </View>

  )
}

const styles = StyleSheet.create({
  navigationButton: {
    height: Dimensions.get('window').width / 100 * 12,
    width: Dimensions.get('window').width / 100 * 20,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
})

export default MapMarkerCategoryButton

