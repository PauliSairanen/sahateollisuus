import React from 'react'
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TouchableNativeFeedback, Platform, Dimensions } from 'react-native'
import Communications from 'react-native-communications'

import Card from '../../components/Card'
import Colors from '../../constants/Colors'
import aboutData from '../../data/jsonFiles/about.json'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const AboutScreen = props => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={styles.content} >
        <Card style={styles.card}>
          <Text style={styles.title}>Welcome</Text>

          <View style={styles.contentContainer}>
            <Text style={styles.bodyText}>{aboutData.bodyText1}</Text>
            <Text style={styles.bodyText}>{aboutData.bodyText2}</Text>
            <Text style={styles.bodyText}>{aboutData.bodyText3}</Text>
            <Text style={styles.bodyText}>{aboutData.bodyText4}</Text>
          </View>

          <Text style={styles.title}>Location</Text>
          <View style={styles.contentContainer}>
            <Text style={styles.infoText}>{aboutData.eventPlace.name}</Text>
            <Text style={styles.infoText}>{aboutData.eventPlace.address}</Text>

            <TouchableComponent
              onPress={() => {
                Communications.phonecall(`${aboutData.eventPlace.phone}`, true)
              }}>
                <Text style={styles.infoText}>{aboutData.eventPlace.phone}</Text>
            </TouchableComponent>

            <TouchableComponent
              style={styles.button}
              onPress={() => {
                Communications.email(
                  ['', `${aboutData.eventPlace.email}`]
                  , null
                  , null
                  , 'Please give a subject to this email'
                  , '')
              }}>
                <Text style={styles.infoText}>{aboutData.eventPlace.email}</Text>
            </TouchableComponent>
          </View>

          <Text style={styles.title}>More information</Text>
          <View style={styles.contentContainer}>

          <TouchableComponent
              onPress={() => {
                Communications.web(`${aboutData.eventWebUrl}`)
              }}>
              <View style={styles.button}>
                <Text style={styles.link}>{aboutData.moreInformation.eventWebsite}</Text>
              </View>
            </TouchableComponent>

            {/* <TouchableComponent
              onPress={() => {
                Communications.web(`${aboutData.eventWebUrl}`)
              }}>
              <View style={styles.button}>
                <Text style={styles.link}>{aboutData.moreInformation.organizer}</Text>
              </View>
            </TouchableComponent> */}

            <TouchableComponent
              style={styles.button}
              onPress={() => {
                Communications.email(
                  ['', 'info@sahateollisuus.com']
                  , null
                  , null
                  , 'Please give a subject to this email'
                  , '')
              }}>
              <View style={styles.button}>
                <Text style={styles.link}>{aboutData.moreInformation.email}</Text>
              </View>
            </TouchableComponent>
          </View>

          <View style={styles.contentContainer}>
            <Text style={styles.disclaimerText}>{aboutData.disclaimer1}</Text>
            <Text style={styles.disclaimerText}>{aboutData.disclaimer2}</Text>
          </View>

        </Card>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  content: {
    justifyContent: 'center',
    alignItems: "center",
  },
  card: {
    flex: 1,
    margin: 20,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  title: {
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  about: {
    margin: 10
  },
  contentContainer: {
    margin: 15,
  },
  bodyText: {
    fontSize: 12,
    paddingBottom: 5,
    textAlign: 'justify'
  },
  infoText: {
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 2,
  },
  button: {
    height: Dimensions.get('window').width / 100 * 7,
    justifyContent: 'center',
  },
  link: {
    fontSize: 12,
    textAlign: 'center',
    color: Colors.link
  },
  disclaimerText: {
    textAlign: 'justify',
    fontSize: 9,
    paddingBottom: 5
  },
})

export default AboutScreen