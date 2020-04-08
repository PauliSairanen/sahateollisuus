import React from 'react'

// Parent Component
const ExampleComponent = props => {
  return (
    <Hello name="Paul" />
  )
}

// Child Component
const Hello = props => {
  return <h1>Hello, {props.name}</h1>
}

export default ExampleComponent












// import React from 'react'
// import {View, Text, StyleSheet} from 'react-native'

// const CustomComponent = props => {
//   return (
//     <View>
//       <Text></Text>
//     </View>
//   )
// }

// const styles = StyleSheet.create({

// })

// export default CustomComponent