import React from 'react'
import { View, Text, StyleSheet, Image, FlatList } from 'react-native'

import SponsorLogoItem from '../../components/SponsorLogoItem'

import image1 from '../../assets/images/sponsors_logos2020/db-schenker_1080.jpg'
import image2 from '../../assets/images/sponsors_logos2020/DHL_1080.jpg'
import image3 from '../../assets/images/sponsors_logos2020/Euroports_1080.jpg'
import image4 from '../../assets/images/sponsors_logos2020/fenniarail_1080.jpg'
import image5 from '../../assets/images/sponsors_logos2020/Fracht_1080.jpg'
import image6 from '../../assets/images/sponsors_logos2020/Greencarrier_1080.jpg'
import image7 from '../../assets/images/sponsors_logos2020/hacklin_1080.jpg'
import image8 from '../../assets/images/sponsors_logos2020/Hoolin_1080.jpg'
import image9 from '../../assets/images/sponsors_logos2020/MSC_1080.jpg'
import image10 from '../../assets/images/sponsors_logos2020/portofhelsinki_1080.jpg'
import image11 from '../../assets/images/sponsors_logos2020/portofpietarsaari_1080.jpg'
import image12 from '../../assets/images/sponsors_logos2020/portofpori_1080.jpg'
import image13 from '../../assets/images/sponsors_logos2020/raahe_1080.jpg'
import image14 from '../../assets/images/sponsors_logos2020/Rauanheimo_1080.jpg'
import image15 from '../../assets/images/sponsors_logos2020/rauma_1080.jpg'
import image16 from '../../assets/images/sponsors_logos2020/rpgroup_1080.jpg'
import image17 from '../../assets/images/sponsors_logos2020/scan_global_1080.jpg'
import image18 from '../../assets/images/sponsors_logos2020/steveco_1080.jpg'
import image19 from '../../assets/images/sponsors_logos2020/VRtranspoint_1080.jpg'

arrayOfImages = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10, image11, image12, image13, image14, image15, image16, image17, image18, image19]

const SponsorsScreen = props => {
  return (
    <View>
      <FlatList
        data={arrayOfImages}
        keyExtractor={(item) => item.index}
        renderItem={arrayOfImages =>
          <SponsorLogoItem
            image={arrayOfImages.item}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SponsorsScreen
