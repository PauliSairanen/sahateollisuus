import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'

import Colors from '../../constants/Colors'
import serverURL from '../../constants/Networking'
import ImageWithLoadingIndicator from '../Universal/ImageWithLoadingIndicator'

const initialLayout = { width: Dimensions.get('window').width }

const Venue_1Tab = props => {
  const eventId = useSelector(state => state.eventData.eventId)
  const venueData = useSelector(state => state.eventData.venueData)
  const ImageID1 = venueData[0].image

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]} >
      <ReactNativeZoomableView
        maxZoom={1.5}
        minZoom={1}
        zoomStep={1.5}
        initialZoom={1}
        bindToBorders={true}
        captureEvent={true}
      >
        <ImageWithLoadingIndicator
          source={`${serverURL}/public/${eventId}/${ImageID1}`}
          style={styles.image}
          resizeMode={FastImage.resizeMode.contain}
        />
      </ReactNativeZoomableView>
    </View>
  );


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: venueData[0].title },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
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

export default Venue_1Tab
