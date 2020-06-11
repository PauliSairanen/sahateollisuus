import React from 'react'
import { View, StyleSheet, Dimensions, TouchableOpacity, TouchableNativeFeedback , Platform} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const MapNavigationButton = props => {
  const iconName = props.iconName
  const lat = props.latitude
  const long = props.longitude
  const animationTime = props.animationTime

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
  navigationButton: {
    height: Dimensions.get('window').width / 100 * 13,
    aspectRatio: 1,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,

  },
})

export default MapNavigationButton

