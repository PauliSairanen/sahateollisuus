import React from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Button, 
  Dimensions, 
} from 'react-native'

import {Container, Header} from 'native-base'
import {Col, Row, Grid} from 'react-native-easy-grid'

import NavigationMain from './components/NavigationMain'
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const numColumns=2;
const data =[
  {key: 'A'}, {key: 'B'},{key: 'C'},{key: 'D'}, {key: 'E'},{key: 'F'}, {key: 'G'}, {key: 'H'},{key: 'I'},{key: 'J'}, {key: 'K'},{key: 'L'},
];

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

  renderItem = ({item, index}) => {
    return (
      <View style={styles.item}>
        <Text style={styles.itemText}>
          {item.key}
        </Text>
      </View>
    )
  }

  render() {
    return (
      <FlatList
        data={data}
        contentContainerStyle={styles.navigationBlock}
        renderItem={this.renderItem}
        numColumns={numColumns}
      />




      // <Container>
      //   <Header/>
      //   <Grid>
      //     <Col style={{ backgroundColor: '#00BFFF', width: "48%",   }}>
      //       <Row style={{ backgroundColor: '#FFA500', }}>
      //         <Text>Orange color</Text>
      //         <Text>Go to participants</Text>
      //       </Row>
      //       <Row style={{ backgroundColor: '#FF4500',  }}>
      //         <Text>Red Color</Text>
      //         <Text>Go to schedules</Text>
      //       </Row>
      //     </Col>

      //     <Col style={{ backgroundColor: '#00BFFF', width: "48%"  }}>
      //       <Row style={{ backgroundColor: '#228B22', }}>
      //         <Text>Green color</Text>
      //         <Text>Go to materials</Text>
      //       </Row>
      //       <Row style={{ backgroundColor: '#00FFFF',  }}>
      //         <Text>Blue Color</Text>
      //         <Text>Go somewhere else</Text>
      //       </Row>
      //     </Col>
      //   </Grid>
      // </Container>

      // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      //   <Text>this is navigation screen</Text>
      //   <Button
      //     title="Go to Participants"
      //     onPress={() => this.props.navigation.navigate('Participants')}
      //   />
      //   <Button
      //     title="Go to Schedules"
      //     onPress={() => this.props.navigation.navigate('Schedules')}
      //   />
      //   <Button
      //     title="Go to Materials"
      //     onPress={() => this.props.navigation.navigate('Materials')}
      //   />
      // </View>
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
  },

  navigationBlock: {
    marginVertical: 20,
  },

  item:{
    backgroundColor: '#FFD700', 
    alignItems: 'center', 
    justifyContent: 'center', 
    flex: 1,
    margin: 1, 
    height: Dimensions.get('window').width/numColumns
  }
});
