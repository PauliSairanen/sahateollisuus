import React, { useState } from 'react'
import { View, Text, StyleSheet, Alert } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'

const coordinateArray = [
  { name: 'Burger King', latitude: 60.167900, longitude: 24.940680 },
  { name: 'Naughty Burger', latitude: 60.165840, longitude: 24.936250 },
  { name: 'Friends and Brgrs', latitude: 60.169498, longitude: 24.169498 },
]

const showAlert = () => {
  Alert.alert(
    'You are about to be navigated to proper navigation',
    'another text in here',
    [
      {
        text: 'cancel',
        style: 'cancel'
      },
      { text: 'Ok' }
    ]
  )
}

const MapsScreen = props => {
  const [coordinates, setCoordinates] = useState(coordinateArray)


  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      style={styles.map}
      region={{
        latitude: 60.170880,
        longitude: 24.941540,
        latitudeDelta: 0.016,
        longitudeDelta: 0.06,

      }}>

        <Marker
        key={coordinateArray[0].name}
        coordinate={{latitude: coordinateArray[0].latitude, longitude: coordinateArray[0].longitude}}
        title={coordinateArray[0].name}
        >

        </Marker>
      {coordinates.map(marker => {
        <Marker
          key={marker.name}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.name}
        >
          <Callout onPress={showAlert} >
            <Text>{marker.name}</Text>
          </Callout>

        </Marker>
      })}

    </MapView>
  )
}

const styles = StyleSheet.create({
  map: {
    height: '100%'
  }
})

export default MapsScreen