import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions, ActivityIndicator, Modal } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { useSelector } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS } from 'react-native-permissions'

import Colors from '../../constants/Colors'
import Card from '../../components/Universal/Card'
import MapsNavigationButton from '../../components/MapComponents/MapNavigationButton'
import MapMarkerCategoryButton from '../../components/MapComponents/MapMarkerCategoryButton'

import RestaurantCallout from '../../components/MapComponents/RestaurantCallout'
import HotelCallout from '../../components/MapComponents/HotelCallout'
import OtherCallout from '../../components/MapComponents/OtherCallout'

import RestaurantModal from '../../components/MapComponents/RestaurantModal'
import HotelModal from '../../components/MapComponents/HotelModal'
import OtherModal from '../../components/MapComponents/OtherModal'


let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
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
  const mapData = useSelector(state => state.eventData.mapData)

  const [userCurrentLocation, setUserCurrentLocation] = useState(false)
  const [markerData, setMarkerData] = useState(mapData.restaurants)
  const [pinColor, setPinColor] = useState('red')
  const [modalVisible, setModalVisible] = useState(false);
  const [isRestaurants, setIsRestaurants] = useState(true)
  const [isHotels, setIsHotels] = useState(false)
  const [isOthers, setIsOthers] = useState(false)
  const [currentMarkerData, setCurrentMarkerData] = useState('')

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
        const currentPosition = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          latitudeDelta: 0.016,
          longitudeDelta: 0.06
        }
        console.log(currentPosition)
        setUserCurrentLocation(currentPosition)
      },
      error => Alert.alert(error.message),
      { enableHighAccuracy: true, timeout: 20000 }
    )
  }

  useEffect(() => {
    requestLocationPermission()
  }, [])


  if (userCurrentLocation == false) {
    return (
      <View style={styles.container}>
        <ActivityIndicator
          size='large'
          color={Colors.primary}
        />
        <Text>Getting Gps location..</Text>
      </View>
    )
  } else {
    return (
      <View>
        {isRestaurants ? (
          <RestaurantModal
            visibility={modalVisible}
            setModalVisible={setModalVisible}
            name={currentMarkerData.name}
            description={currentMarkerData.description}
            address={currentMarkerData.address}
            webURL={currentMarkerData.webURL}
            imageURL={currentMarkerData.image}
          />) : <View></View>
        }
        {isHotels ? (
          <HotelModal
            visibility={modalVisible}
            setModalVisible={setModalVisible}
          />) : <View></View>
        }
        {isOthers ? (
          <OtherModal
            visibility={modalVisible}
            setModalVisible={setModalVisible}
          />) : <View></View>
        }

        <View style={styles.absoluteTopContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.markerButtonContainer}>
              <MapMarkerCategoryButton
                name={'Restaurants'}
                onPress={() => {
                  setMarkerData(mapData.restaurants)
                  setPinColor('red')
                  setIsRestaurants(true)
                  setIsHotels(false)
                  setIsOthers(false)
                }}
              />
              <MapMarkerCategoryButton
                name={'Hotels'}
                onPress={() => {
                  setMarkerData(mapData.hotels)
                  setPinColor('green')
                  setIsRestaurants(false)
                  setIsHotels(true)
                  setIsOthers(false)
                }}
              />
              <MapMarkerCategoryButton
                name={'Other'}
                onPress={() => {
                  setMarkerData(mapData.others)
                  setPinColor('blue')
                  setIsRestaurants(false)
                  setIsHotels(false)
                  setIsOthers(true)
                }}
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
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={ref => (this.MapView = ref)}
          style={styles.map}
          initialRegion={userCurrentLocation}
          showsUserLocation={true}
        >
          {
            markerData.map((marker, index) => (
              <Marker
                key={marker.name}
                coordinate={{ latitude: parseFloat(marker.lat), longitude: parseFloat(marker.long) }}
                title={marker.name}
                key={index}
                pinColor={pinColor}
              >
                <Callout
                  onPress={() => {
                    setModalVisible(true)
                    setCurrentMarkerData(markerData[index])
                  }}
                  style={styles.calloutFlex}
                >
                  {isRestaurants ? (
                    <RestaurantCallout
                      name={marker.name}
                      category={marker.category}
                    />) : <View></View>
                  }
                  {isHotels ? (
                    <HotelCallout
                      name={marker.name}
                      rating={marker.rating}
                    />) : <View></View>
                  }
                  {isOthers ? (
                    <OtherCallout
                      name={marker.name}
                      type={marker.type}
                    />) : <View></View>
                  }
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
  modalCenteringContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 90,
    height: Dimensions.get('window').height / 100 * 75,
  },
  map: {
    height: '100%',
    zIndex: -1,
  },
  absoluteTopContainer: {
    height: Dimensions.get('window').width / 100 * 32,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  calloutFlex: {
    flex: 1,
    width: Dimensions.get('window').width / 100 * 40
    // borderColor: 'black',
    // borderWidth: 1,
  },
  markerButtonContainer: {
    flex: 4,
    marginTop: 10,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  navigationButtonsContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
    // borderColor: 'black',
    // borderWidth: 1,
  },

})

export default MapsScreen