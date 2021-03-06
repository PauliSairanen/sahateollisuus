import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Modal } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import Pdf from 'react-native-pdf'
import { useSelector } from 'react-redux'

import AdjustingText from '../Universal/AdjustingText'
import Card from '../Universal/Card'
import Colors from '../../constants/Colors'
import serverURL from '../../constants/Networking'
import { withNavigation, SafeAreaView } from 'react-navigation'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const KeynoteAndProgrammeItem = props => {
  const eventId = useSelector(state => state.eventData.eventId)
  const [modalVisible, setModalVisible] = useState(false);

  const time = props.time
  const location = props.location
  const description = props.description
  const pdfFileName = props.pdf
  const webSource = { uri: `${serverURL}/public/${eventId}/${pdfFileName}`, cache: true };

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

      {/* ____________________List item ____________________ */}
      <View style={styles.listElement}>
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <AdjustingText>{time}</AdjustingText>
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.description}>{description}</Text>
          </View>
          <View style={styles.textContainer}>
            <AdjustingText>{location}</AdjustingText>
          </View>
        </View>
        <View style={styles.pdfContainer}>
          <TouchableComponent
            onPress={() => {
              setModalVisible(true)
            }}
          >
            <View style={styles.pdfContainer}>
              <Card style={styles.pdfCardContainer}>
                <Icon
                  name={'pdffile1'}
                  size={Dimensions.get('window').width / 100 * 16}
                  color={Colors.pdf}
                />
              </Card>
            </View>
          </TouchableComponent>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  listElement: {
    marginTop: 15,
    width: Dimensions.get('window').width / 100 * 85,
    borderBottomColor: '#e0e0e0',
    borderBottomWidth: 3,
  },
  pdfContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
    marginBottom: 10,
  },
  pdfCardContainer: {
    width: Dimensions.get('window').width / 100 * 20,
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
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
  description: {
    fontWeight: 'bold',
    textAlign: 'center'
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