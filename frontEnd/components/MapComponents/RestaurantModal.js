import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableNativeFeedback, Dimensions, Platform } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image'
import Communications from 'react-native-communications'

import Card from '../Universal/Card'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const RestaurantModal = props => {
  const modalVisible = props.visibility
  const setModalVisible = props.setModalVisible
  const name = props.name
  const description = props.description
  const address = props.address
  const webURL = props.webURL
  const imageUrl = props.imageURL

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
    >
      <View style={styles.modalCenteringContainer}>
        <Card style={styles.modalContainer}>
          <View style={styles.flexContainer}>
            <View style={styles.contentContainer}>
              <FastImage
                // source={{ uri: `${serverURL}/images/sponsorImages/${imageID}` }}
                source={{ uri: `${imageUrl}` }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.contain}
              />
            </View>
            <View style={styles.contentContainer}>
              <Text style={styles.title}>{name}</Text>
            </View>
            <View style={styles.contentContainer}>
              <Text>{description}</Text>
            </View>
            <Text style={styles.title}>Contact information</Text>
            <View style={styles.contentContainer}>
              <Text>{address}</Text>
            </View>
            <View style={styles.contentContainer}>
              <TouchableComponent
                onPress={() => {
                  Communications.web(`${webURL}`)
                }}>
                <View style={styles.button}>
                  <Text style={styles.link}>{webURL}</Text>
                </View>
              </TouchableComponent>
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
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalCenteringContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 90,
    height: Dimensions.get('window').height / 100 * 65,
  },
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    margin: 5,
  },
  image: {
    width: Dimensions.get('screen').width / 100 * 80,
    height: Dimensions.get('screen').height / 100 * 20,
    // borderColor: 'black',
    // borderWidth: 1,
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


