import React from 'react'
import { Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import Colors from '../../constants/Colors'
import Card from '../../components/Universal/Card'

let TouchableComponent = TouchableOpacity
// if (Platform.OS === 'android' && Platform.Version >= 21) {
//   TouchableComponent = TouchableNativeFeedback
// }

const MapMarkerCategoryButton = props => {
  const buttonName = props.name

  return (
    <Card style={styles.buttonContainer}>
      <TouchableComponent
        style={styles.navigationButton}
        onPress={props.onPress}
      >
        <Text style={{ fontSize: 10 }}>
          {buttonName}
        </Text>
      </TouchableComponent>
    </Card>
  )
}

const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    height: Dimensions.get('window').width / 100 * 12,
    width: Dimensions.get('window').width / 100 * 20,
    marginHorizontal: 5,
    borderColor: Colors.primary,
    borderWidth: 1,
  },
  navigationButton: {
    alignItems: 'center',
    justifyContent: 'center', 
    height: Dimensions.get('window').width / 100 * 11,
    width: Dimensions.get('window').width / 100 * 20,
  },
})

export default MapMarkerCategoryButton

