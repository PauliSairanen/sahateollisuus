import React, { useState } from 'react'
import { View, Button, StyleSheet, KeyboardAvoidingView, ScrollView } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import Card from '../../components/Card'
import Input from '../../components/Input'
import Colors from '../../constants/Colors'
import participantData from '../../data/jsonFiles/participants'


const LoginScreen = props => {
 
  return (
    <View>
      <LinearGradient colors={['orange', 'yellow']} style={styles.gradient}>
        <Card style={styles.loginContainer}>
          <ScrollView>
            <Input
              id='email'
              label="E-mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please Enter a valid email address."
              onInputChange={(text) => setEmail({text})}
              initialValue=""
            />

            <Input
              id='password'
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLenght={3}
              autoCapitalize="none"
              errorText="Please Enter a valid password."
              onInputChange={(text) => setPassword({text})}
              initialValue=""
            />
            <View style={styles.buttonContainer}>
              <Button //Switch text in title depending on state
                title={'Login'}
                color={Colors.primary}
                // onPress={loginHandler}
              />
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
  }
})

export default LoginScreen