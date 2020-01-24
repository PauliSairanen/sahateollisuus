import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

const NavigationText = props => {
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
    fontFamily: 'OpenSans-Condensed-Bold',  
    // In specs OpenSans-Condensed-Regular is asked, but I couldn´t find it!
    
  }
})

export default NavigationText