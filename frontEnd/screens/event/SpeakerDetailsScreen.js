import React, { useState } from 'react'
import { View, FlatList, StyleSheet, Text, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'
import Card from '../../components/Universal/Card'
import KeynoteAndProgrammeItem from '../../components/ListItems/KeynoteAndProgrammeItem'
import serverURL from '../../constants/Networking'
import ImageWithLoadingIndicator from '../../components/Universal/ImageWithLoadingIndicator'

const SpeakerDetailsScreen = props => {
  const [speakerName, setSpeakerName] = useState(props.navigation.getParam('speakerName'))
  const [title, setTitle] = useState(props.navigation.getParam('title'))
  const [specialTitle, setSpecialTitle] = useState(props.navigation.getParam('specialTitle'))
  const [company, setCompany] = useState(props.navigation.getParam('company'))
  const [imageID, setImageID] = useState(props.navigation.getParam('imageID'))
  const [description, setDescription] = useState(props.navigation.getParam('description'))

  const eventId = useSelector(state => state.eventData.eventId)
  const programmeData = useSelector(state => state.eventData.programmeData)
  const arrayOfProgramme = []

  //_____ Looping through programmeData to gather presentations of current speaker
  for (const day in programmeData) {
    for (const index in programmeData[day].content) {
      if (programmeData[day].content[index].NameOfSpeaker === speakerName) {
        arrayOfProgramme.push(programmeData[day].content[index])
      }
    }
  }

  headerComponent = () => {
    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <View style={styles.imageContainer}>
            <ImageWithLoadingIndicator
              source={`${serverURL}/public/${eventId}/${imageID}`}
              style={styles.image}
              resizeMode={FastImage.resizeMode.cover}
            />
          </View>
        </View>
        <View style={styles.contentContainer}>
          <Text style={styles.nameText}>{speakerName}</Text>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{company}</Text>
          {specialTitle
            ? <Text style={styles.text}>{specialTitle}</Text>
            : <View></View>
          }
        </View>
        {description
          ? <View style={styles.contentContainer}>
            <View style={styles.bodyText}>
              <Text style={styles.bodyText}>{description}</Text>
            </View>
          </View>
          : <View></View>
        }
        <View style={styles.contentContainer}>
          <Text style={styles.title}>Presentations</Text>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <View style={styles.container}>
          <FlatList
            nestedScrollEnabled={true}
            ListHeaderComponent={headerComponent}
            data={arrayOfProgramme}
            extraData={arrayOfProgramme}
            keyExtractor={(item, index) => index.toString()}
            renderItem={arrayOfProgramme =>
              <KeynoteAndProgrammeItem
                time={arrayOfProgramme.item.Time}
                location={arrayOfProgramme.item.Location}
                description={arrayOfProgramme.item.Description}
                pdf={arrayOfProgramme.item.Pdf}
              />
            }
          />
        </View>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    justifyContent: 'center',
    alignItems: "center",
    marginVertical: 10,
  },
  card: {
    flex: 1,
    margin: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: Dimensions.get('window').width / 100 * 95,
  },
  imageContainer: {
    width: Dimensions.get('window').width / 100 * 50,
    height: Dimensions.get('window').width / 100 * 50,
    borderRadius: 250 / 2,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: Colors.black,
    margin: 10,
  },
  image: {
    width: '100%',
    height: '100%'
  },
  nameText: {
    fontSize: 24,
    paddingBottom: 10,
    fontWeight: 'bold'
  },
  text: {
    fontSize: 14,
    marginBottom: 2,
    fontWeight: 'bold'
  },
  title: {
    marginTop: 15,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bodyText: {
    fontSize: 13,
    textAlign: 'justify',
    marginHorizontal: 10,
    marginVertical: 8,
  },
})

export default SpeakerDetailsScreen

