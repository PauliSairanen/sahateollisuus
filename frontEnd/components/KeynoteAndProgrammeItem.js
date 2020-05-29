import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Modal, Button } from 'react-native'
import FastImage from 'react-native-fast-image'
import Icon from 'react-native-vector-icons/AntDesign'

import Card from './Card'
import Colors from '../constants/Colors'
import { withNavigation } from 'react-navigation'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const KeynoteAndProgrammeItem = props => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <Card>
          <View style={styles.modal}>
            <TouchableComponent
              title={'Close modal'}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Icon
                name={'pdffile1'}
                size={Dimensions.get('window').width / 100 * 15}
                color={Colors.pdf}
              />
            </TouchableComponent>
          </View>
        </Card>
      </Modal>


      <View style={styles.listElement}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text>8:00</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Welcome</Text>
          </View>
          <View style={styles.textContainer}>
            <Text>Congresss hall</Text>
          </View>
        </View>
        <View style={styles.pdfContainer}>
          <TouchableComponent
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <Card style={styles.pdfCardContainer}>
              <Icon
                name={'pdffile1'}
                size={Dimensions.get('window').width / 100 * 15}
                color={Colors.pdf}
              />
            </Card>
          </TouchableComponent>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listElement: {
    margin: 15,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 3,
  },
  pdfContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  pdfCardContainer: {
    width: Dimensions.get('window').width / 100 * 19,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    // borderBottomColor: '#e0e0e0',
    // borderBottomWidth: 3,

  },
  textContainer: {
    margin: 8,
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    paddingBottom: 4,
    fontWeight: 'bold'
  },
  text: {
    paddingLeft: 7,
    fontSize: 12,
    marginBottom: 5,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 100 * 30,
    height: Dimensions.get('window').width / 100 * 30,
    borderRadius: 150 / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.black,
    marginLeft: 10,
  },
  image: {
    width: '100%',
    height: '100%'
  }
})

export default withNavigation(KeynoteAndProgrammeItem) 