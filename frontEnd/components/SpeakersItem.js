import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Image } from 'react-native'
import FastImage from 'react-native-fast-image'

import Card from './Card'
import Colors from '../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const SpeakersItem = props => {
  const speakerName = props.speaker
  const title = props.title
  const specialTitle = props.specialTitle
  const company = props.company
  const imageID = props.image

  if (speakerName && title && company && !specialTitle) {
    return (
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{props.speaker}</Text>
              <Text style={styles.text}>{props.title}</Text>

              <Text style={styles.text}>{props.company}</Text>
            </View>
            <View style={styles.imageContainer}>
              <FastImage
                source={{ uri: `https://sahat.lamk.fi/images/speakerImages/${imageID}` }}
                style={styles.image}
                resizeMode={FastImage.resizeMode.cover}
              />
            </View>
          </View>
        </View>
      </Card>
    )
  } else if (speakerName && title && company && specialTitle) {
    return (
      <Card style={styles.card}>
        <View style={styles.content}>
          <View style={styles.row}>
            <View style={styles.textContainer}>
              <Text style={styles.nameText}>{props.speaker}</Text>
              <Text style={styles.text}>{props.title}</Text>

              <Text style={styles.text}>{props.company}</Text>
              <Text style={styles.text}>{props.specialTitle}</Text>

            </View>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: `https://sahat.lamk.fi/images/speakerImages/${imageID}` }}
                style={styles.image}
                resizeMode={'cover'}
              />
            </View>
          </View>
        </View>
      </Card>
    )
  }

}

const styles = StyleSheet.create({
  card: {
    margin: 15,
  },
  content: {
    margin: 20,
  },
  row: {
    flex: 1,
    flexDirection: 'row'
  },
  textContainer: {
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

export default SpeakersItem