import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import Colors from '../../constants/Colors'

import ProgrammeItem from '../ListItems/ProgrammeItem'

const initialLayout = { width: Dimensions.get('window').width }

const ProgrammeTab2 = props => {
  const programmeData = props.data

  // Receive data, which has days separated as objects, each object containing an array holding the programme Data

  const day1Data = programmeData[0].content
  const day2Data = programmeData[1].content
  const day3Data = programmeData[2].content

  const FirstRoute = () => (
    <View>
    <FlatList
      data={day1Data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={programmeData =>
        <ProgrammeItem
          time={programmeData.item.Time}
          location={programmeData.item.Location}
          description={programmeData.item.Description}
          speaker={programmeData.item.NameOfSpeaker}
          titleOfSpeaker={programmeData.item.TitleOfSpeaker}
          specialTitleOfSpeaker={programmeData.item.SpecialTitleOfSpeaker}
          companyOfSpeaker={programmeData.item.CompanyOfSpeaker}
        />
      }
    />
  </View>
  );

  const SecondRoute = () => (
    <View>
    <FlatList
      data={day2Data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={programmeData =>
        <ProgrammeItem
          time={programmeData.item.Time}
          location={programmeData.item.Location}
          description={programmeData.item.Description}
          speaker={programmeData.item.NameOfSpeaker}
          titleOfSpeaker={programmeData.item.TitleOfSpeaker}
          specialTitleOfSpeaker={programmeData.item.SpecialTitleOfSpeaker}
          companyOfSpeaker={programmeData.item.CompanyOfSpeaker}
        />
      }
    />
  </View>
  );
  
  const ThirdRoute = () => (
    <View>
    <FlatList
      data={day3Data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={programmeData =>
        <ProgrammeItem
          time={programmeData.item.Time}
          location={programmeData.item.Location}
          description={programmeData.item.Description}
          speaker={programmeData.item.NameOfSpeaker}
          titleOfSpeaker={programmeData.item.TitleOfSpeaker}
          specialTitleOfSpeaker={programmeData.item.SpecialTitleOfSpeaker}
          companyOfSpeaker={programmeData.item.CompanyOfSpeaker}
        />
      }
    />
  </View>
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: programmeData[0].day },
    { key: 'second', title: programmeData[1].day },
    { key: 'third', title: programmeData[2].day },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute,
  });

  // ______ Settings styles for tabs _____
  const renderTabBar = props => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: Colors.primary }}
      style={{ backgroundColor: 'white' }}
      renderLabel={({ route, focused, color }) => (
        <Text style={{ color: Colors.primary, fontSize: 14 }}>
          {route.title}
        </Text>
      )}
    />
  )

  //_____ Tab bar related props come here _____
  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      swipeEnabled={false}
    />
  );
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',

  }
});

export default ProgrammeTab2
