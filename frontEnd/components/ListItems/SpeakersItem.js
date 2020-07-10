import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import Card from '../Universal/Card'
import { useSelector } from 'react-redux'
import { withNavigation } from 'react-navigation'

import Colors from '../../constants/Colors'
import serverURL from '../../constants/Networking'
import ImageWithLoadingIndicator from '../Universal/ImageWithLoadingIndicator'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const SpeakersItem = props => {
  const eventId = useSelector(state => state.eventData.eventId)

  const [speakerName, setSpeakerName] = useState(props.speaker)
  const [title, setTitle] = useState(props.title)
  const [specialTitle, setSpecialTitle] = useState(props.specialTitle)
  const [company, setCompany] = useState(props.company)
  const [imageID, setImageID] = useState(props.image)
  const [description, setDescription] = useState(props.description)

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
              description: description,
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
                <ImageWithLoadingIndicator
                  source={`${serverURL}/public/${eventId}/${imageID}`}
                  style={styles.image}
                  resizeMode={'cover'}
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
              description: description,
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
                <ImageWithLoadingIndicator
                  source={`${serverURL}/public/${eventId}/${imageID}`}
                  style={styles.image}
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
        <Text>Missing required data entries. </Text>
        <Text></Text>
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
    height: '100%',
  },
  errorContainer: {
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default withNavigation(SpeakersItem) 