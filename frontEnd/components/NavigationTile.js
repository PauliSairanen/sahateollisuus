import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { withNavigation } from 'react-navigation'

import Card from './Card'
import ButtonText from './TextComponents/ButtonText'
import Colors from '../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const NavigationTile = props => {
  let navigationLink = props.navigationLink

  return (
    <Card style={styles.tile}>
      <TouchableComponent
        style={styles.touchable}
        onPress={() => {
          props.navigation.navigate(navigationLink)
        }}
      >
        <View style={styles.contentContainer}>
          <Ionicons
            name={props.iconName}
            size={Dimensions.get('window').width / 100 * 20}
            color={Colors.primary}
          />
          <ButtonText>{props.title}</ButtonText>
        </View>
      </TouchableComponent>
    </Card>
  )
}

const styles = StyleSheet.create({
  tile: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    height: Dimensions.get('window').width / 100 * 45,

  },
  touchable: {
    height: Dimensions.get('window').width / 100 * 45,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default withNavigation(NavigationTile)