import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions, ActivityIndicator } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS } from 'react-native-permissions'

import Colors from '../../constants/Colors'
import MapsNavigationButton from '../../components/MapButtons/MapNavigationButton'
import MapMarkerCategoryButton from '../../components/MapButtons/MapMarkerCategoryButton'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const coordinateArray = [
  { name: 'Burger King', latitude: 60.167900, longitude: 60.167900 },
  { name: 'Naughty Burger', latitude: 60.165840, longitude: 24.936250 },
  { name: 'Hesburger', latitude: 60.163390, longitude: 24.948150 },
]

const mapData = { 
  restaurants: [
    {
      'lat': 60.167900,
      'long': 60.167900,
      'name': 'Burger King',
      'address': 'Kuningaskatu 6',
      'description': 'Paras hampurilaisravintola!',
      'category': 'Hamburgers',
      'webURL': 'www.burgerking.com',
      'image': 'https://bk-emea-prd.s3.amazonaws.com/sites/burgerking.fi/files/carousel/BK_Mix_and_Match_768x805_lokakuu.jpg',
    },
    {
      'lat': 60.165840,
      'long': 24.936250,
      'name': 'naughty Burger',
      'address': 'Tuhmakatu  69',
      'description': 'PVähän tuhmempi hampurilaisravintola!',
      'category': 'Hamburgers',
      'webURL': 'https://naughtybrgr.com/menu/?lang=en',
      'image': 'https://naughtybrgr.com/wp-content/uploads/2018/05/akseli-img.jpg',
    }
  ],
  hotels: [
    {
      'lat': 60.167641,
      'long': 24.942430,
      'name': 'Hotel Kämp',
      'address': 'Pohjoisesplanadi 29, 00100 Helsinki',
      'description': 'Arvokas ja hieno hotelli ;-)',
      'rating': '5.0',
      'webURL': 'https://www.hotelkamp.com/en/',
      'image': 'https://r-cf.bstatic.com/images/hotel/max1024x768/207/207779415.jpg'
    },
    {
      'lat': 60.165840,
      'long': 24.936251,
      'name': 'Omena Hotel',
      'address': 'Lönnrotinkatu 13, 00120 Helsinki',
      'description': 'Vähän edullitempi majoitusvaihtoehto',
      'rating': '3.0',
      'webURL': 'https://www.omenahotels.com/fi/',
      'image': 'https://s3-eu-west-1.amazonaws.com/omenahotels-wordpress/app/uploads/2014/12/OMK9767-640x480.jpg'
    },
  ],
  other: [
    {
      'lat': 60.166630,
      'long': 24.947310,
      'name': 'Savoy Teatteri',
      'address': 'Kasarmikatu 46, 00130 Helsinki',
      'description': 'Vähän Teatteriviihdettä',
      'type': 'Teatteri',
      'webURL': 'http://www.savoyteatteri.fi/',
      'image': 'https://www.sttinfo.fi/data/images/00073/b4366216-aae3-495a-b281-62e5aaff3bc3-w_960.jpg'
    },
    {
      'lat': 60.181570,
      'long': 24.955300,
      'name': 'Vape Room Helsinki',
      'address': 'Hämeentie 7 C, 00530 Helsinki',
      'description': 'Vähän Teatteriviihdettä',
      'type': 'Vapes and e-liquids',
      'webURL': 'http://www.savoyteatteri.fi/',
      'image': 'https://www.sttinfo.fi/data/images/00073/b4366216-aae3-495a-b281-62e5aaff3bc3-w_960.jpg'
    }
  ]
}

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
  const [userCurrentLocation, setUserCurrentLocation] = useState(false)
  const [markerCategory, setMarkerCategory] = useState()
  const [venueLocation, setVenueLocation] = useState()

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

  if (userCurrentLocation == false) {
    return (
      <View>
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
      </View>
    )
  } else {
    return (
      <View>
        <View>
          <View style={styles.absoluteTopContainer}>
            <View style={styles.flexContainer}>
              <View style={styles.emptyContainer}></View>
              <View style={styles.markerButtonContainer}>
                <MapMarkerCategoryButton
                  name={'Restaurants'}
                />
                <MapMarkerCategoryButton
                  name={'Hotels'}
                />
                <MapMarkerCategoryButton
                  name={'Other'}
                />
              </View>

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
    height: Dimensions.get('window').width / 100 * 15,
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
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  emptyContainer: {
    flex: 1,
    borderColor: 'black',
    borderWidth: 1,
  },
  markerButtonContainer: {
    flex: 4,
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'black',
    borderWidth: 1,
  },
  navigationButtonsContainer: {
    flex: 1,
    marginTop: 70,
    flexDirection: 'column',
    borderColor: 'black',
    borderWidth: 1,
  },
})

export default MapsScreen