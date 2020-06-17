import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableNativeFeedback, Dimensions, Platform, Alert } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import Communications from 'react-native-communications'
import { showLocation } from 'react-native-map-link'

import Card from '../Universal/Card'
import Colors from '../../constants/Colors'
import AdjustingText from '../Universal/AdjustingText'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const RestaurantModal = props => {
  const modalVisible = props.visibility
  const setModalVisible = props.setModalVisible
  const name = props.name
  // const description = props.description
  const description = '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.'
  const address = props.address
  const webURL = props.webURL
  const imageUrl = props.imageURL
  const latitude = props.latitude
  const longitude = props.longitude
  const sourceLatitude = props.sourceLatitude
  const sourceLongitude = props.sourceLongitude

  const showAlert = () => {
    Alert.alert(
      'Navigate to the address?',
      'Open Maps application to navigate?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => showLocation({
            latitude: latitude,
            longitude: longitude,
            sourceLatitude: sourceLatitude,
            sourceLongitude: sourceLongitude,
          })
        }
      ],
      { cancelable: false }
    );
  }

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
    >
      <View style={styles.modalCenteringContainer}>
        <View style={styles.modalDimensionsContainer}>
          <Card style={styles.modalContainer}>
            <View style={styles.flexContainer}>
              <View style={styles.imageContainer}>
                <FastImage
                  // source={{ uri: `${serverURL}/images/sponsorImages/${imageID}` }}
                  source={{ uri: `${imageUrl}` }}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.contain}
                />
              </View>
              <View style={styles.titleContainer}>
                <Text style={styles.title}>{name}</Text>
              </View>
              <View style={styles.descriptionContainer}>
                <AdjustingText style={styles.descriptionText}>{description}</AdjustingText>
              </View>
              <Text style={styles.title}>Contact information</Text>
              <View style={styles.contactInfoContainer}>
                <View style={styles.buttonContainer}>
                  <TouchableComponent
                    onPress={() => {
                      showAlert()
                    }}>
                    <View style={styles.button}>
                      <Text style={styles.link}>{address}</Text>
                    </View>
                  </TouchableComponent>
                </View>

                <View style={styles.buttonContainer}>
                  <TouchableComponent
                    onPress={() => {
                      Communications.web(`${webURL}`)
                    }}>
                    <View style={styles.button}>
                      <Text style={styles.link}>{webURL}</Text>
                    </View>
                  </TouchableComponent>
                </View>
              </View>
              <TouchableComponent
                title={'Close modal'}
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Ionicons
                  name={Platform.OS === 'android' ? 'md-close' : 'ios-close'}
                  size={Dimensions.get('window').width / 100 * 15}
                  color={Colors.pdf}
                />
              </TouchableComponent>

            </View>
          </Card>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalCenteringContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalDimensionsContainer: {
    width: Dimensions.get('window').width / 100 * 90,
    height: Dimensions.get('window').width / 100 * 145,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: Dimensions.get('screen').width / 100 * 85,
    height: Dimensions.get('screen').width / 100 * 50,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  imageContainer: {
    flex: 5,
    marginTop: 12,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  descriptionContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    // borderColor: 'black',
    // borderWidth: 1,
  },
  descriptionText: {
    textAlign : 'center'
  },
  contactInfoContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: 'black',
    // borderWidth: 1,
  },
  buttonContainer: {
    marginBottom: 5,
  },
  button: {
    height: Dimensions.get('window').width / 100 * 7,
    justifyContent: 'center',
  },
  link: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.link
  },
})

export default RestaurantModal


