import React from 'react'
import { View, StyleSheet, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions } from 'react-native'
import { withNavigation } from 'react-navigation'
import Communications from 'react-native-communications'
import FastImage from 'react-native-fast-image'

import Card from '../Universal/Card'
import serverURL from '../../constants/Networking'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const SponsorLogoItem = props => {
  const imageID = props.imageID
  const link = props.link
  const eventId = props.eventId

  return (
    <Card style={styles.card}>
      <TouchableComponent
        style={styles.touchable}
        onPress={() => {
          Communications.web(`https://` + `${link}`)
        }}
      >
        <View style={styles.imageContainer}>
          <FastImage
            source={{ uri: `${serverURL}/public/${eventId}/${imageID}` }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.contain}
          />
        </View>
      </TouchableComponent>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    margin: 15,
    borderRadius: 20,
    height: Dimensions.get('window').width / 100 * 45,
  },
  touchable: {
    height: '100%',
    width: '100%'
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  image: {
    width: '80%',
    height: '80%'
  }
})

export default withNavigation(SponsorLogoItem)