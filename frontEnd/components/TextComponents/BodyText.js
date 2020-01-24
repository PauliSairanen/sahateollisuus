import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const BodyText = props => {
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
    fontFamily: 'OpenSansCondensed-Light',
    color: '#4c4c4c'
  }
})

export default BodyText