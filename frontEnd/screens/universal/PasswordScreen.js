import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TextInput, ActivityIndicator, Keyboard, Alert, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { useDispatch } from 'react-redux'
import * as eventDataActions from '../../store/actions/eventData'

import Card from '../../components/Universal/Card'
import Colors from '../../constants/Colors'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const PasswordScreen = props => {
  const dispatch = useDispatch()
  const [inputPassword, setInputPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  const eventId = props.navigation.getParam('eventId')
  const eventName = props.navigation.getParam('eventName')

  //__________ Password authentication __________
  // If test login, navigate to next screen
  const loginHandler = async () => {
    console.log('VerifyPass function called')
    if (inputPassword === 'test') {
      console.log('Using test route, Fetching all data without token')
      await dispatch(eventDataActions.fetchAllDataTest(eventId))
      props.navigation.navigate('MainScreen')
    }
    // Sends email and password to backend for authentication
    // If request == ok, token is received, which is used in fetching selected event´s data 
    console.log('Using real authentication route')
    setError(null)
    setIsLoading(true)
    try {
      const token = await dispatch(eventDataActions.authenticate(eventName, inputPassword))
      console.log(token)
      await dispatch(eventDataActions.fetchAllData(eventId, token))
      props.navigation.navigate('MainScreen')
    } catch (err) {
      setError(err.message)
      setIsLoading(false)
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
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry
                onChangeText={(text) => {
                  setInputPassword(text)
                }}
              />
              <View style={styles.buttonContainer}>
                {isLoading ? (<ActivityIndicator size='small' color={Colors.primary} />
                ) : (<Button //Switch text in title depending on state
                  title={'Login'}
                  color={Colors.primary}
                  onPress={loginHandler}
                />)}
              </View>
            </ScrollView>
          </Card>
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
})

export default PasswordScreen