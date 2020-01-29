import React from 'react';
import { View, StyleSheet, Dimensions, Image, } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import ImageZoom from 'react-native-image-pan-zoom'

import firstFloorImage from '../assets/images/venue_maps/paasiekakerros1080.jpg'
import secondFloorImage from '../assets/images/venue_maps/paasitokakerros1080.jpg'

const initialLayout = { width: Dimensions.get('window').width }

const VenueTabComponent = props => {

  const FirstRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]} >
      <View style={styles.imageContainer}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width / 100 * 90}
          imageHeight={Dimensions.get('window').width /100 * 90}
        >
          <Image
            style={styles.image}
            source={firstFloorImage}
            resizeMode='center'
          />
        </ImageZoom>
      </View>
    </View>
  );

  const SecondRoute = () => (
    <View style={[styles.scene, { backgroundColor: 'white' }]} >
      <View style={styles.imageContainer}>
        <ImageZoom
          cropWidth={Dimensions.get('window').width}
          cropHeight={Dimensions.get('window').height}
          imageWidth={Dimensions.get('window').width / 100 * 90}
          imageHeight={Dimensions.get('window').width /100 * 90}
          panToMove={true}
        >
          <Image
            style={styles.image}
            source={secondFloorImage}
            resizeMethod='scale'
            resizeMode='center'
          />
        </ImageZoom>
      </View>
    </View>
  );


  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'First Floor' },
    { key: 'second', title: 'Second Floor' },
  ]);

  const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
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
    flex: 1,
    width: '100%',
    height: '100%',
  }
});

export default VenueTabComponent
