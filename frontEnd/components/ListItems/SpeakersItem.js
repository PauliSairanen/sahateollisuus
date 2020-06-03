import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions} from 'react-native'
import FastImage from 'react-native-fast-image'

import Card from '../Universal/Card'
import Colors from '../../constants/Colors'
import { withNavigation } from 'react-navigation'

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

  // useEffect(() => {
  //   props.navigation.setParams({
  //     speakerName: speakerName,
  //     title: title,
  //     specialTitle: specialTitle,
  //     company: company,
  //     imageID: imageID
  //   })
  // }, [])


  if (speakerName && title && company && !specialTitle) {
    return (
      <Card style={styles.card}>
        <TouchableComponent
          onPress={() => {
            //_____ Navigating to details screen, passing current values along for rendering _____
            props.navigation.navigate('SpeakerDetails', {
              speakerName: speakerName,
              title: title,
              specialTitle: specialTitle,
              company: company,
              imageID: imageID
            })
          }}
        >
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
        </TouchableComponent>
      </Card>
    )
  } else if (speakerName && title && company && specialTitle) {
    return (
      <Card style={styles.card}>
        <TouchableComponent
          onPress={() => {
            props.navigation.navigate('SpeakerDetails', {
              speakerName: speakerName,
              title: title,
              specialTitle: specialTitle,
              company: company,
              imageID: imageID
            })
          }}
        >
          <View style={styles.content}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.nameText}>{props.speaker}</Text>
                <Text style={styles.text}>{props.title}</Text>
                <Text style={styles.text}>{props.company}</Text>
                <Text style={styles.text}>{props.specialTitle}</Text>
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
        </TouchableComponent>
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

export default withNavigation(SpeakersItem) 