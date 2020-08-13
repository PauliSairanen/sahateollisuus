import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TextInput, ActivityIndicator, Keyboard, Platform, Alert } from 'react-native'
import { useDispatch } from 'react-redux'
import LinearGradient from 'react-native-linear-gradient'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import DeviceInfo from 'react-native-device-info'

import AdjustingText from '../../components/Universal/AdjustingText'
import Card from '../../components/Universal/Card'
import Colors from '../../constants/Colors'
import * as eventDataActions from '../../store/actions/eventData'

const EmailScreen = props => {
  const dispatch = useDispatch()
  const [inputEmail, setInputEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const version = DeviceInfo.getVersion()

  // When screen is entered, clear all inputs and state
  useEffect(() => {
    props.navigation.addListener('didFocus', () => {
      setInputEmail('')
      setIsLoading(false)
      setError(null)
      this.textInput.clear()
    })
  }, [])

  //__________ Email Authentication __________ 
  // If test login used, move to next screen
  // Else, fetch events using input email and navigate to next screen
  const authHandler = async () => {
    if (inputEmail === 'test') {
      console.log('Test login')
      await dispatch(eventDataActions.fetchEventMetaData())
      props.navigation.navigate('SelectEvent', {
        'lastScreen': 'emailScreen'
      })
    } else {
      console.log('Firing real authentication route')
      setError(null)
      setIsLoading(true)
      try {
        // Dispatch action to check if email exists and load events based on email
        await dispatch(eventDataActions.fetchMetadataByEmail(inputEmail))
        props.navigation.navigate('SelectEvent')
      } catch (err) {
        setError(err.message)
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    if (error) {
      Alert.alert('Login failed', error, [{ text: 'Okay' }])
    }
  }, [error])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false} >
      <View>
        <LinearGradient colors={['orange', 'yellow']} style={styles.gradient}>
          <Card style={styles.loginContainer}>
            <ScrollView
              keyboardShouldPersistTaps='handled'
            >
              <Text style={styles.label}>Email</Text>
              <TextInput
                ref={input => { this.textInput = input }}
                style={styles.input}
                autoCapitalize={'none'}
                autoCorrect={false}
                keyboardType='email-address'
                onChangeText={(text) => {
                  setInputEmail(text)
                }}
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />
                ) : (<Button //Switch text in title depending on state
                  title={'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />)}
              </View>
            </ScrollView>
          </Card>
          <View style={styles.versionContainer}>
            <AdjustingText style={styles.versionText}>Version: {version}</AdjustingText>
          </View>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  headerTitleStyle: {
    fontFamily: 'Rubik-Bold',
    color: Platform.OS === 'android' ? 'white' : Colors.primary
  },
  label: {
    marginVertical: 8,
  },
  loginContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 40
  },
  gradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonContainer: {
  },
  input: {
    margin: 10,
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  versionContainer: {
   position: 'absolute',
   bottom: '5%',
  },
  versionText: {
    color: 'gray'
  }
})

export default EmailScreen