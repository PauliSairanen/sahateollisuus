import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const AdjustingText = props => {
  const screenWidth = Dimensions.get('screen').width

  // console.log(screenWidth)
  let fontSize = 8

  if (screenWidth <= 300) {
    fontSize = 10
    // console.log('Window Size: ' + screenWidth )
    // console.log('Using font size of: ' + fontSize)
  }
  else if (screenWidth <= 350) {
    fontSize = 12
  }
  else if (screenWidth <= 375) {
    fontSize = 13
  }
  else if (screenWidth >= 400) {
    fontSize = 14
  }

  // console.log('current screen width: ' + screenWidth)
  // console.log(fontSize)

  return (
    <View>
      <Text style={{ fontSize: fontSize, ...props.style }}>
        {props.children}
      </Text>
    </View>
  )
}

export default AdjustingText