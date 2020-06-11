import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS } from 'react-native-permissions'

import MapsNavigationButton from '../../components/MapButtons/MapNavigationButton'
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
  const [venueLocation, setVenueLocation] = useState()
  const [refreshScreen, setRefreshScreen] = useState(false)

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
    props.navigation.addListener('didFocus', () => {
      setRefreshScreen(true)
      setRefreshScreen(false)
      console.log('Navigated to Maps screen. Doing a quick refresh')
      requestLocationPermission()
    })

  }, [])

  return (
    <View>
      <View>
        <View style={styles.absoluteTopContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.navigationButtonsContainer}>
              <MapsNavigationButton
                latitude={60.169810}
                longitude={24.938130}
                animationTime={1000}
                iconName={'home'}
              />
              <MapsNavigationButton
                latitude={userCurrentLocation.latitude}
                longitude={userCurrentLocation.longitude}
                animationTime={1000}
                iconName={'navigate'}
              />
            </View>
          </View>
        </View>
      </View>



      <MapView
        provider={PROVIDER_GOOGLE}
        ref={ref => (this.MapView = ref)}
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

        {
          coordinates.map((marker, index) => (
            <Marker
              key={marker.name}
              coordinate={{ latitude: marker.latitude, longitude: marker.longitude }}
              title={marker.name}
              key={index}
            >
              <Callout>
                <View style={styles.container}>
                  <View>
                    <Text>{marker.name}</Text>
                  </View>
                  <View style={styles.markerButton}>
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
          ))
        }
      </MapView >
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    height: '100%',
    zIndex: -1,
  },
  absoluteTopContainer: {
    height: Dimensions.get('window').width / 100 * 30,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderColor: 'black',
    borderWidth: 1,
  },
  flexContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  navigationButtonsContainer: {
    flex: 1,
    flexDirection: 'column',
    margin: 13,
  },
  markerButton: {
    height: Dimensions.get('window').width / 100 * 10,
    aspectRatio: 1,
    borderColor: 'black',
    borderWidth: 1,
    margin: 5,
  },
  navigationButton: {
    height: Dimensions.get('window').width / 100 * 12,
    aspectRatio: 1,
    borderColor: Colors.primary,
    borderWidth: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 7,
  },
  categoryButtonsContainer: {

  }
})

export default MapsScreen