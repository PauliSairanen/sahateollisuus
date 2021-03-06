import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Alert, Platform, Dimensions, ActivityIndicator } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from 'react-native-maps'
import { useSelector } from 'react-redux'
import Geolocation from '@react-native-community/geolocation'
import { request, PERMISSIONS } from 'react-native-permissions'

import Colors from '../../constants/Colors'
import MapNavigationButton from '../../components/MapComponents/MapNavigationButton'
import MapMarkerCategoryButton from '../../components/MapComponents/MapMarkerCategoryButton'

import RestaurantCallout from '../../components/MapComponents/RestaurantCallout'
import HotelCallout from '../../components/MapComponents/HotelCallout'
import OtherCallout from '../../components/MapComponents/OtherCallout'

import RestaurantModal from '../../components/MapComponents/RestaurantModal'
import HotelModal from '../../components/MapComponents/HotelModal'
import OtherModal from '../../components/MapComponents/OtherModal'

const MapsScreen = props => {
  const mapData = useSelector(state => state.eventData.mapData)
  const eventMetadata = useSelector(state => state.eventData.metaData)

  const [userCurrentLocation, setUserCurrentLocation] = useState(false)
  const [markerData, setMarkerData] = useState(mapData.restaurants)
  const [currentMarkerData, setCurrentMarkerData] = useState('')
  const [pinColor, setPinColor] = useState('red')
  const [modalVisible, setModalVisible] = useState(false);
  const [isRestaurants, setIsRestaurants] = useState(true)
  const [isHotels, setIsHotels] = useState(false)
  const [isOthers, setIsOthers] = useState(false)

  // When maps are opened for the first time, permission is asked for GPS usage
  // If permission is given, the current location is saved to state
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

  // When the maps screen is laucnhed, the functions above are executed
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
      //__________ Modals conditionally rendered __________
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
            latitude={currentMarkerData.lat}
            longitude={currentMarkerData.long}
            sourceLatitude={userCurrentLocation.latitude}
            sourceLongitude={userCurrentLocation.longitude}
          />) : <View></View>
        }
        {isHotels ? (
          <HotelModal
            visibility={modalVisible}
            setModalVisible={setModalVisible}
            name={currentMarkerData.name}
            description={currentMarkerData.description}
            address={currentMarkerData.address}
            rating={currentMarkerData.rating}
            webURL={currentMarkerData.webURL}
            imageURL={currentMarkerData.image}
            latitude={currentMarkerData.lat}
            longitude={currentMarkerData.long}
            sourceLatitude={userCurrentLocation.latitude}
            sourceLongitude={userCurrentLocation.longitude}
          />) : <View></View>
        }
        {isOthers ? (
          <OtherModal
            visibility={modalVisible}
            setModalVisible={setModalVisible}
            name={currentMarkerData.name}
            description={currentMarkerData.description}
            address={currentMarkerData.address}
            category={currentMarkerData.category}
            webURL={currentMarkerData.webURL}
            imageURL={currentMarkerData.image}
            latitude={currentMarkerData.lat}
            longitude={currentMarkerData.long}
            sourceLatitude={userCurrentLocation.latitude}
            sourceLongitude={userCurrentLocation.longitude}
          />) : <View></View>
        }
        {/* __________ UI Buttos __________ */}
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
                  if (this.Marker != null) {
                    this.Marker.hideCallout()
                  }
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
                  if (this.Marker != null) {
                    this.Marker.hideCallout()
                  }
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
                  if (this.Marker != null) {
                    this.Marker.hideCallout()
                  }
                }}
              />
            </View>
            <View style={styles.navigationButtonsContainer}>
              <MapNavigationButton
                latitude={parseFloat(eventMetadata.lat)}
                longitude={parseFloat(eventMetadata.long)}
                animationTime={2000}
                iconName={'star'}
              />
              <MapNavigationButton
                latitude={userCurrentLocation.latitude}
                longitude={userCurrentLocation.longitude}
                animationTime={2000}
                iconName={'navigate'}
              />
            </View>
          </View>
        </View>

        {/* __________ MapView, Markers and Callouts __________ */}
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
                ref={ref => this.Marker = ref}
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
                      category={marker.category}
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
  absoluteTopContainer: {
    height: Dimensions.get('window').width / 100 * 32,
    width: Dimensions.get('window').width,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  flexContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start'
  },
  calloutFlex: {
    flex: 1,
    width: Dimensions.get('window').width / 100 * 40
  },
  markerButtonContainer: {
    flex: 4,
    marginTop: 10,
    padding: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  navigationButtonsContainer: {
    flex: 1,
    marginTop: 10,
    flexDirection: 'column',
  },
  map: {
    height: '100%',
    zIndex: -1,
  },
})

export default MapsScreen