import React from 'react'
import { View, Text, StyleSheet, Modal, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Card from '../Universal/Card'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const OtherModal = props => {
  const modalVisible = props.visibility
  const name = props.name
  const description = props.description
  const address = props.address
  const webURL = props.webURL
  const setModalVisible = props.setModalVisible

  return (
    <Modal
      transparent={true}
      animationType="slide"
      visible={modalVisible}
    >
      <View style={styles.modalCenteringContainer}>
        <Card style={styles.modalContainer}>
          <Text>This is a OTHER modal :D</Text>
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
    flex: 0,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 90,
    height: Dimensions.get('window').height / 100 * 75,
  },
})

export default OtherModal


