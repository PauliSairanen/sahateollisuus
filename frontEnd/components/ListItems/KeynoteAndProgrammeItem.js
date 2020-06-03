import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Modal, Button } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Pdf from 'react-native-pdf'


import Card from '../Universal/Card'
import Colors from '../../constants/Colors'
import { withNavigation, SafeAreaView } from 'react-navigation'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const KeynoteAndProgrammeItem = props => {
  const [modalVisible, setModalVisible] = useState(false);

  const time = props.time
  const location = props.location
  const description = props.description
  const pdfFileName = props.pdf

  const webSource = { uri: `https://sahat.lamk.fi/images/programmeImages/${pdfFileName}`, cache: true };

  return (
    <View>
      <Modal
        animationType="slide"
        visible={modalVisible}
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.pdfContainer}>
            <Pdf
              source={webSource}
              onLoadComplete={(numberOfPages, filePath) => {
                console.log(`number of pages: ${numberOfPages}`);
              }}
              onPageChanged={(page, numberOfPages) => {
                console.log(`current page: ${page}`);
              }}
              onError={(error) => {
                console.log(error);
              }}
              onPressLink={(uri) => {
                console.log(`Link presse: ${uri}`)
              }}
              style={styles.pdf} />
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
        </SafeAreaView>
      </Modal>

      <View style={styles.listElement}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.textSize}>{time}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textSize}>{description}</Text>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.textSize}>{location}</Text>
          </View>
        </View>
        <TouchableComponent
          onPress={() => {
            setModalVisible(true)
          }}
        >
          <View style={styles.pdfContainer}>
            <Card style={styles.pdfCardContainer}>
              <Icon
                name={'pdffile1'}
                size={Dimensions.get('window').width / 100 * 15}
                color={Colors.pdf}
              />
            </Card>
          </View>
        </TouchableComponent>
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
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  pdfCardContainer: {
    width: Dimensions.get('window').width / 100 * 19,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    flex: 1,
    margin: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 95,
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
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameText: {
    fontSize: 16,
    paddingBottom: 4,
    fontWeight: 'bold'
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