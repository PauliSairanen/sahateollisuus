import React from 'react'
import { View, Text, StyleSheet, Button, Image } from 'react-native'
import { TextInput } from 'react-native-gesture-handler'

const CustomComponent = props => {

let Image_Http_URL ={ uri: 'https://reactnativecode.com/wp-content/uploads/2017/05/react_thumb_install.png'};

  return (
    <View >

    
      <View style={styles.container}>
        <View style={styles.margin}>
        <Text>This is basic text component</Text>
        </View>
        <View style={styles.margin}>
        <Button
          title='This is basic button component'
        />
        </View>
        <View style={styles.margin}>
        <TextInput
          style={{ height: 40, width: 250, borderColor: 'gray', borderWidth: 1 }}
          placeholder="This is text input component"
          placeholderTextColor='gray'    
        />
        </View>

      </View>
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          source={Image_Http_URL}
          resizeMode={'cover'} // cover or contain its upto you view look
        />
        <Text>This is basic image component</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  margin: {
    marginVertical: 10
  },
  image: {
    width: '50%',
    height: '50%'
  }

})

export default CustomComponent