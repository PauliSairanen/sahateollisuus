import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const AdjustingText = props => {
  const screenWidth = Dimensions.get('screen').width
  let fontSize = 8

  if (screenWidth <= 300) {
    fontSize = 10
  }
  if (screenWidth <= 350) {
    fontSize = 12
  }
  if (screenWidth >= 400) {
    fontSize = 14
  }

  console.log('current screen width: ' + screenWidth)
  console.log(fontSize)

  return (
    <View>
      <Text style={{ fontSize: fontSize, ...props.style }}>
        {props.children}
      </Text>
    </View>
  )
}

export default AdjustingText