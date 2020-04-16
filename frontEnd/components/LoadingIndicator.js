import React from 'react'
import {View, Text, StyleSheet, ActivityIndicator} from 'react-native'

import Colors from '../constants/Colors'

const LoadingIndicator = props => {
  return (
    <View style={styles.container}>
      <ActivityIndicator 
        size='large' 
        color={Colors.primary}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center'
  }
})

export default LoadingIndicator