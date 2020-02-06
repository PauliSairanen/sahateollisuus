import React, { useState, useCallback } from 'react'
import { View, Text, Button, StyleSheet, ScrollView, TextInput, ActivityIndicator, Keyboard, Alert, Dimensions, Platform } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Card from '../../components/Card'
import Colors from '../../constants/Colors'
import participantData from '../../data/jsonFiles/participants.json'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

const LoginScreen = props => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const eventPassword = 'WFFC2020'

  const adminEmail = 'admin@test'
  const adminPassword = 'admin'

  let loginFailed = false

  const loginFunction = () => {
    // Admin login
    if (inputEmail === adminEmail && inputPassword === adminPassword) {
      console.log('Admin login!')
      loginFailed = false
      props.navigation.navigate('MainNavScreen')
    } else {
      // Check if user exits
      setIsLoading(true)
      for (const object of participantData) {
        if (object.Email === inputEmail && eventPassword === inputPassword) {
          setIsLoading(false)
          loginFailed = false
          console.log('Authenticatication success!')
          props.navigation.navigate('MainNavScreen')
          return
        } else {
          setIsLoading(false)
          loginFailed = true
        }
      }
      if (loginFailed = true) {
        Alert.alert('Login failed', 'Incorrect login credentials', [{ text: 'Okay' }])
      }
    }
  }

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
                style={styles.input}
                autoCapitalize='none'
                keyboardType='email-address'
                onChangeText={(text) => {
                  setInputEmail(text)
                }}
              />
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
                  onPress={loginFunction}
                />)}
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </View>
    </TouchableWithoutFeedback>
  )
}

LoginScreen.navigationOptions = {
  headerTitle: () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerTitleStyle}>Wood from Finland Conference 2020</Text>
    </View>),
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

export default LoginScreen