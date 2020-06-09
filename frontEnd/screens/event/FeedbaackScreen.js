import React from 'react'
import { View, Text, StyleSheet, Platform, Dimensions, TouchableOpacity, TouchableNativeFeedback } from 'react-native'
import Communications from 'react-native-communications'
import Ionicons from 'react-native-vector-icons/Ionicons'

import Card from '../../components//Universal/Card'
import Colors from '../../constants/Colors'

let TouchableComponent = TouchableOpacity
if (Platform.OS === 'android' && Platform.Version >= 21) {
  TouchableComponent = TouchableNativeFeedback
}

let recepientEmail = 'info@sahateollisuus.com'

const FeedbackScreen = props => {
  return (
    <View style={styles.contentContainer}>
      <Card style={styles.card}>
        <TouchableComponent
          style={styles.button}
          onPress={() => {
            Communications.email(
              [`${recepientEmail}`]
              , null
              , null
              , 'Feedback about the conference and the mobile app'
              , '')
          }}
        >
          <View style={styles.center}>
            <View>
              <Ionicons
                style={styles.icon}
                name={Platform.OS === 'android' ? 'md-mail' : 'ios-mail'}
                size={Dimensions.get('window').width / 100 * 20}
                color={Colors.primary}
              />
            </View>
            <View>
              <Text style={styles.text}>Send us feedback</Text>
            </View>

          </View>
        </TouchableComponent>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  button: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    width: Dimensions.get('window').width / 100 * 50,
    height: Dimensions.get('window').width / 100 * 50,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    paddingBottom: 5,
  },
  text: {
    fontSize: 18,
  }
})

export default FeedbackScreen