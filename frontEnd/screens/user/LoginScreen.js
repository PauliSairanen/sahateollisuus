import React, { useState, useCallback } from 'react'
import { View, Text, Button, StyleSheet, KeyboardAvoidingView, ScrollView, TextInput, ActivityIndicator } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Card from '../../components/Card'

import Colors from '../../constants/Colors'
import participantData from '../../data/jsonFiles/participants.json'



const LoginScreen = props => {
  const [inputEmail, setInputEmail] = useState('')
  const [inputPassword, setInputPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const eventPassword = 'abcd'


  const loginFunction = () => {

    setIsLoading(true)
    let emailFound = false

    for (var i = 0; i < participantData.length; i++) {
      if (participantData[i].Email === inputEmail) {
        emailFound = true
        setIsLoading(false)
        break
      } else {
        emailFound = false
        setIsLoading(false)
      }
    }

    if (emailFound === true && eventPassword === inputPassword) {
      console.log('Authenticatication success!')
    } else {
      console.log('Authentication not successfull :(')
    }




  }

  return (
    <View>
      <LinearGradient colors={['orange', 'yellow']} style={styles.gradient}>
        <Card style={styles.loginContainer}>
          <ScrollView>

            <Text>Email</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              keyboardType='email-address'
              onChangeText={(text) => {
                setInputEmail(text)
              }}

            />
            <Text>Password</Text>
            <TextInput
              style={styles.input}
              autoCapitalize='none'
              onChangeText={(text) => {
                setInputPassword(text)
              }}
            />


            <View style={styles.buttonContainer}>

              {isLoading ? (<ActivityIndicator size='small' color={Colors.primary}/>
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
  )
}

LoginScreen.navigationOptions = {
  headerTitle: 'Login'
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
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
    marginTop: 10
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderColor: '#ccc',
    borderWidth: 1,
  }
})

export default LoginScreen