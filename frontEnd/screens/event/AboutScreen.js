import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

import Card from '../../components/Card'
import aboutData from '../../data/jsonFiles/about.json'

const AboutScreen = props => {
  return (
    <View style={{flex: 1}}>
      <ScrollView contentContainerStyle={styles.content} >
        <Card style={styles.card}>
          <View style={styles.title}>
            <Text style={{ fontWeight: 'bold' }}>{aboutData.about.title}</Text>
          </View>
          <View style={styles.mainTextWrapper}>
            <View style={styles.bodyText}>
              <Text>{aboutData.about.bodyText0}</Text>
            </View>
            <View style={styles.bodyText}>
              <Text>{aboutData.about.bodyText1}</Text>
            </View>
            <View style={styles.bodyText}>
              <Text>{aboutData.about.bodyText2}</Text>
            </View>
            <View style={styles.bodyText}>
              <Text>{aboutData.about.bodyText3}</Text>
            </View>
          </View>
          <View style={styles.bodyText}>
            <Text>{aboutData.about.writerName}, {aboutData.about.writerPosition}</Text>
            <Text>{aboutData.about.company}</Text>
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
    padding: 10,
    fontWeight: 'bold'
  },
  about: {
    padding: 10
  },
  mainTextWrapper: {
    textAlign: 'center'
  },
  bodyText: {
    padding: 10
  },
})

export default AboutScreen