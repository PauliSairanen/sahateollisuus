import React, {  useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Modal } from 'react-native'
import FastImage from 'react-native-fast-image'

import Card from './Card'
import Colors from '../constants/Colors'
import { withNavigation } from 'react-navigation'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const KeynoteAndProgrammeItem = props => {
  const [modalVisible, setModalVisible] = useState('false')
  
  return (
    <Card style={styles.card}>
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
        <Card>
          <TouchableComponent
            onPress={() => {
              
            }}
          >
            <Text>This button should open modal</Text>
          </TouchableComponent>
        </Card>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    margin: 15,
  },
  pdfContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
  },
  modal: {
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 30,
    height: Dimensions.get('window').width / 100 * 30
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#e0e0e0'
  },
  textContainer: {
    margin: 8,
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'center'
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