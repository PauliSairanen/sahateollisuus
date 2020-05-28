import React, { useEffect } from 'react'
import { View, Text, StyleSheet, Platform, TouchableOpacity, TouchableNativeFeedback, Dimensions } from 'react-native'
import FastImage from 'react-native-fast-image'

import Card from './Card'
import Colors from '../constants/Colors'
import { withNavigation } from 'react-navigation'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

const KeynoteAndProgrammeItem = props => {
  return (
    <Card style={styles.card}>
      <View>

        <View>
          <Text>8:00</Text>
          <Text>Welcome</Text>
          <Text>Congresss hall</Text>
        </View>

        <View>
          <Card>
            <Text>PDF comes here :D</Text>
          </Card>
        </View>

      </View>
    </Card>
  )
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

export default withNavigation(KeynoteAndProgrammeItem) 