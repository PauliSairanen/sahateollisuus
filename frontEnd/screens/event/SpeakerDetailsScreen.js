import React from 'react'
import { View, FlatList, StyleSheet, Text, Dimensions, ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'
import Card from '../../components/Card'
import KeynoteAndProgrammeItem from '../../components/KeynoteAndProgrammeItem'

const SpeakerDetailsScreen = props => {
  const { navigation } = props

  const speakerName = navigation.getParam('speakerName')
  const title = navigation.getParam('title')
  const specialTitle = navigation.getParam('specialTitle')
  const company = navigation.getParam('company')
  const imageID = navigation.getParam('imageID')

  const programmeData = useSelector(state => state.eventData.programmeData)
  const arrayOfProgramme = []

  // Collecting all programme entries for current speaker into an array
  for (const index in programmeData) {
    if (programmeData[index].NameOfSpeaker === speakerName) {
      arrayOfProgramme.push(programmeData[index])
    }
  }
  console.log(arrayOfProgramme[0].Time)

  headerComponent1 = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage
            source={{ uri: `https://sahat.lamk.fi/images/speakerImages/${imageID}` }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.nameText}>{speakerName}</Text>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{company}</Text>
          <Text style={styles.text}>{specialTitle}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
        </View>
      </View>
    )
  }

  headerComponent2 = () => {
    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <FastImage
            source={{ uri: `https://sahat.lamk.fi/images/speakerImages/${imageID}` }}
            style={styles.image}
            resizeMode={FastImage.resizeMode.cover}
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.nameText}>{speakerName}</Text>
          <Text style={styles.text}>{title}</Text>
          <Text style={styles.text}>{company}</Text>
        </View>
        <View style={styles.contentContainer}>
          <Text>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</Text>
        </View>
      </View>
    )
  }


  if (speakerName && title && company && specialTitle) {
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.container}>
            <FlatList
              nestedScrollEnabled={true}
              ListHeaderComponent={headerComponent1}
              data={arrayOfProgramme}
              extraData={arrayOfProgramme}
              keyExtractor={(item, index) => index.toString()}
              renderItem={arrayOfProgramme =>
                <KeynoteAndProgrammeItem
                  time={arrayOfProgramme.item.Time}
                  location={arrayOfProgramme.item.Location}
                  description={arrayOfProgramme.item.Description}
                />
              }
            />
          </View>
        </Card>
      </View>
    )

  } else if (speakerName && title && company && !specialTitle)
    return (
      <View style={styles.container}>
        <Card style={styles.card}>
          <View style={styles.container}>
            <FlatList
              nestedScrollEnabled={true}
              ListHeaderComponent={headerComponent2}
              data={arrayOfProgramme}
              extraData={arrayOfProgramme}
              keyExtractor={(item, index) => index.toString()}
              renderItem={arrayOfProgramme =>
                <KeynoteAndProgrammeItem
                  time={arrayOfProgramme.item.Time}
                  location={arrayOfProgramme.item.Location}
                  description={arrayOfProgramme.item.Description}
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
  content: {
    justifyContent: 'center',
    alignItems: "center",
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
    fontSize: 18,
    paddingBottom: 4,
    fontWeight: 'bold'
  },
  text: {
    paddingLeft: 7,
    fontSize: 14,
    marginBottom: 5,
  },
  contentContainer: {
    margin: 15,
  },
  bodyText: {
    fontSize: 12,
    paddingBottom: 5,
    textAlign: 'justify'
  },
})

export default SpeakerDetailsScreen

