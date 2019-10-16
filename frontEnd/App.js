import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
} from 'react-native';

import NavigationMain from './components/NavigationMain'


const App: () => React$Node = () => {
  return (
    
    <View style={styles.container}>
     <Text> Sahateollisuus App</Text>
      <NavigationMain/>
    </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});

export default App;
