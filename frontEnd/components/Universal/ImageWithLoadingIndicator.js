import React from 'react'
import { createImageProgress } from 'react-native-image-progress'
import FastImage from 'react-native-fast-image'
import * as Progress from 'react-native-progress'
import Colors from '../../constants/Colors'

const Image = createImageProgress(FastImage)

const ImageWithLoadingIndicator = props => {
  const source = props.source
  const width = props.style.width
  const height = props.style.height
  const resizeMode = props.resizeMode

  return (
    <Image
      source={{ uri: source }}
      indicator={Progress.Pie}
      resizeMode={resizeMode}
      indicatorProps={{
        size: 50,
        borderWidth: 0,
        color: Colors.primary,
        unfilledColor: 'rgba(200, 200, 200, 0.2)'
      }}
      style={{
        width: width, 
        height: height
      }} 
    />
  )
}

export default ImageWithLoadingIndicator