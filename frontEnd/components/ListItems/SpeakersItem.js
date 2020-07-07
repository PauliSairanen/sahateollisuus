import React from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import Card from '../Universal/Card'
import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'

import Colors from '../../constants/Colors'
import serverURL from '../../constants/Networking'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const SpeakersItem = props => {
  const eventId = useSelector(state => state.eventData.eventId)

  const speakerName = props.speaker
  const title = props.title
  const specialTitle = props.specialTitle
  const company = props.company
  const imageID = props.image
  const description = props.description

  // console.log('Current speaker´s image is : ' + imageID)
  // console.log('Current event´s eventId is : ' + eventId)

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
              description : description,
              imageID: imageID,
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
                  source={{ uri: `${serverURL}/public/${eventId}/${imageID}` }}
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
              description : description,
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
                  source={{ uri: `${serverURL}/public/${eventId}/${imageID}` }}
                  style={styles.image}
                  resizeMode={FastImage.resizeMode.cover}
                />
              </View>
            </View>
          </View>
        </TouchableComponent>
      </Card>
    )
  } else {
    return (
      <View style={styles.errorContainer}>
        <Text>Missing data entries. Contact administrators.</Text>
        {speakerName
          ? <Text></Text>
          : <Text>Speaker Name not found</Text>
        }
        {title
          ? <Text></Text>
          : <Text>Title not found</Text>
        }
        {specialTitle
          ? <Text></Text>
          : <Text>Special Title not found</Text>
        }
        {company
          ? <Text></Text>
          : <Text>Company not found</Text>
        }
        {imageID
          ? <Text></Text>
          : <Text>imageID not found</Text>
        }
      </View>
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
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default withNavigation(SpeakersItem) 