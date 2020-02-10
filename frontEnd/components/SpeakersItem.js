import React, { useState } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions, Image } from 'react-native'

import Card from './Card'
import Colors from '../constants/Colors'

import image1 from '../assets/images/speakers_2020/Alexander_Aleksin_1080.jpg'
import image2 from '../assets/images/speakers_2020/Anna_Ni_1080.jpg'
import image3 from '../assets/images/speakers_2020/Anniina_Kostilainen_1080.jpg'
import image4 from '../assets/images/speakers_2020/Kai_Merivuori_1080.jpg'
import image5 from '../assets/images/speakers_2020/Kimihiro_Yazawa_1080.jpg'
import image6 from '../assets/images/speakers_2020/Mika_Lehmonen_1080.jpg'
import image7 from '../assets/images/speakers_2020/Paula_Horne_1080.jpg'
import image8 from '../assets/images/speakers_2020/Tommi_Sneck_1080.jpg'
import image9 from '../assets/images/speakers_2020/Tuuli_Koivu_1080.jpg'
import image10 from '../assets/images/speakers_2020/Ville_Skinnari_1080.jpg'
import image11 from '../assets/images/speakers_2020/Esa_Mikkonen_1080.jpg'
import image12 from '../assets/images/speakers_2020/Antti_Koskinen_1080.jpg'
import image13 from '../assets/images/speakers_2020/Kimmo_Tiilikainen_1080.jpg'
import noSpeakerImage from '../assets/images/speakers_2020/No_Speaker_Image.jpg'

export const namesAndImages = [
  { "name": "Alexander Aleksin", "image": image1 },
  { "name": "Kimmo Tiilikainen", "image": noSpeakerImage },
  { "name": "Antti Koskinen", "image": noSpeakerImage },
  { "name": "Anna Ni", "image": image2 },
  { "name": "Anniina Kostilainen", "image": image3 },
  { "name": "Kai Merivuori", "image": image4 },
  { "name": "Kimihiro Yazawa", "image": image5 },
  { "name": "Mika Lehmonen", "image": image6 },
  { "name": "Paula Horne", "image": image7 },
  { "name": "Tommi Sneck", "image": image8 },
  { "name": "Tuuli Koivu", "image": image9 },
  { "name": "Ville Skinnari", "image": image10 },
  { "name": "Esa Mikkonen", "image": image11 },
  { "name": "Antti Koskinen", "image": image12 },
  { "name": "Kimmo Tiilikainen", "image": image13 },
  { "name": "Markku Ollikainen", "image": noSpeakerImage },
  { "name": "Thorsten Leicht", "image": noSpeakerImage },
]

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const SpeakersItem = props => {

  const speakerName = props.speaker
  const title = props.title
  const specialTitle = props.specialTitle
  const company = props.company


  const arrayOfImages = namesAndImages

  let imageToDisplay
  arrayOfImages.forEach(item => {
    if (item.name === speakerName) {
      imageToDisplay = item.image
    }
  })

  if(speakerName && title && company && !specialTitle) {
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
              <Image
                source={imageToDisplay}
                style={styles.image}
                resizeMode={'cover'}
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
                source={imageToDisplay}
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