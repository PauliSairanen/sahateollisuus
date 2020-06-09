import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS } from 'react-native-permissions'

import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const coordinateArray = [
  { name: 'Burger King', latitude: 60.167900, longitude: 24.940680 },
  { name: 'Naughty Burger', latitude: 60.165840, longitude: 24.936250 },
  { name: 'Hesburger', latitude: 60.163390, longitude: 24.948150 },
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
  const [userCurrentLocation, setUserCurrentLocation] = useState()

  requestLocationPermission = async () => {
    if (Platform.OS === 'ios') {
      const response = await request(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      console.log('iPhone: ' + response)
      if (response === 'granted') {
        locateCurrentLocation()
      }
    } else {
      const response = await request(PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION)
      console.log('Android: ' + response)
      if (response === 'granted') {
        locateCurrentLocation()
      }
    }
  }

  locateCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      position => {
        currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.016,
          longitudeDelta: 0.06
        }
        setUserCurrentLocation(currentPosition)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 10000 }
    )
  }

  useEffect(() => {
    requestLocationPermission()

  }, [])

  return (
    <MapView
      provider={PROVIDER_GOOGLE}
      ref={ref => (this.mapView = ref)}
      style={styles.map}
      initialRegion={userCurrentLocation}
      showsUserLocation={true}
    // region={{
    //   latitude: 60.170880,
    //   longitude: 24.941540,
    //   latitudeDelta: 0.016,
    //   longitudeDelta: 0.06,

    // }}
    >

      {coordinates.map(marker => (
        <Marker
          key={marker.name}
          coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
          title={marker.name}
        >
          <Callout>
            <View style={styles.container}>
              <View>
                <Text>{marker.name}</Text>
              </View>
              <View style={styles.button}>
                <TouchableComponent
                  onPress={showAlert}
                  style={styles.container}
                >
                  <Ionicons
                    name={Platform.OS === 'android' ? 'md-car' : 'ios-car'}
                    size={Dimensions.get('window').width / 100 * 10}
                    color={Colors.primary}
                  />
                </TouchableComponent>
              </View>
              <Text>Navigate</Text>
            </View>
          </Callout>
        </Marker>
      ))}

    </MapView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    height: '100%'
  },
  button: {
    height: Dimensions.get('window').width / 100 * 10,
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
  }
})

export default MapsScreen