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
    <View style={styles.buttonContainer}>
      <TouchableComponent
        style={styles.navigationButton}
        onPress={props.onPress}
      >
        <Text style={{ fontSize: 10 }}>
          {buttonName}
        </Text>
      </TouchableComponent>
    </View>

  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  navigationButton: {
    height: Dimensions.get('window').width / 100 * 12,
    width: Dimensions.get('window').width / 100 * 20,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center', 
  },
})

export default MapMarkerCategoryButton

