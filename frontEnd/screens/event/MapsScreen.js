import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps'

const MapsScreen = props => {


  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 60.322800,
        longitude: 24.840810,
        latitudeDelta: 0.09,
        longitudeDelta: 0.035,

      }}>

      </MapView>
  )
}

const styles = StyleSheet.create({
map: {
  height: '100%'
}
})

export default MapsScreen