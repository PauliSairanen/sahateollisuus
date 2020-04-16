import React from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions } from 'react-native'
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
  const navigationLink = props.navigationLink
  const invisible = props.title

  // If the component has invisible, render it, but don´t show anything
  if (invisible === 'invisible') {
    return (
      <View style={styles.invisibleTile}></View>
    )
  } else {
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
}

const styles = StyleSheet.create({
  invisibleTile: {
    flex: 1,
    margin: 15,
    height: Dimensions.get('window').width / 100 * 45,
  },
  tile: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    height: Dimensions.get('window').width / 100 * 45,
    aspectRatio: 1,
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