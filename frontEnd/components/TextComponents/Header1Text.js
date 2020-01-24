import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const Header1Text = props => {
  return (
    <View>
      <Text style={styles.bodyText}>
        {props.children}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  bodyText: {
    fontFamily: 'Rubik-Medium',
    fontSize: 64,
  }
})

export default Header1Text