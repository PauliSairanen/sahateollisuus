import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Button, 
} from 'react-native';

import NavigationMain from './components/NavigationMain'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

class HomeScreen extends React.Component{
  render() {
    return (
      <View style={styles.container}>
      <Text> Sahateollisuus App</Text>
      <Text> This is login screen</Text>
      <Text>  </Text>
      <Text>  </Text>
      <Text>  </Text>  
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate('Navigation')}
        />
        <Button
          title="Cancel"
        />
      </View>
    );
  }
}

class NavigationScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>this is navigation screen</Text>
        <Button
          title="Go to Participants"
          onPress={() => this.props.navigation.navigate('Participants')}
        />
        <Button
          title="Go to Schedules"
          onPress={() => this.props.navigation.navigate('Schedules')}
        />
        <Button
          title="Go to Materials"
          onPress={() => this.props.navigation.navigate('Materials')}
        />
      </View>
    );
  }
}

class ParticipantsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>this is a participants screen</Text>
        <Button
          title="This button does nothing"
        /*  onPress={() => this.props.navigation.navigate('Details')}
       */
        />
      </View>
    );
  }
}

class SchedulesScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>this is a schedule screen</Text>
        <Button
          title="This button does nothing"
         /* onPress={() => this.props.navigation.navigate('Details')}
        */
         />
      </View>
    );
  }
}
class MaterialsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>this is a Material screen</Text>
        <Button
          title="This button does nothing"
         /* onPress={() => this.props.navigation.navigate('Details')}
        */
         />
      </View>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Navigation: NavigationScreen,
    Participants: ParticipantsScreen,
    Schedules : SchedulesScreen,
    Materials: MaterialsScreen,
  },
  {
    initialRouteName: 'Home',
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  }
});
