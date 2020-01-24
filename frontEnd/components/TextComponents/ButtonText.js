import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const ButtonText = props => {
  return (
    <View>
      <Text style={styles.ButtonText}>
        {props.children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  ButtonText: {
    fontFamily: 'Rubik-Bold',
    color: '#4c4c4c'
  }
})

export default ButtonText