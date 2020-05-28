import React from 'react'
import { View,FlatList } from 'react-native'
import { useSelector } from 'react-redux'

import SponsorLogoItem from '../../components/SponsorLogoItem'


// export const companyLinksAndImages = [
//   {
//     "CompanyName": "DB Schenker",
//     "CompanyUrl": "https://www.dbschenker.com",
//     "image": require('../../assets/images/sponsors_logos2020/db-schenker_1080.jpg')
//   },
//   {
//     "CompanyName": "DHL",
//     "CompanyUrl": "https://www.dhl.com",
//     "image": require('../../assets/images/sponsors_logos2020/DHL_1080.jpg')
//   },
//   {
//     "CompanyName": "Euroports Finland",
//     "CompanyUrl": "https://www.euroports.fi",
//     "image": require('../../assets/images/sponsors_logos2020/Euroports_1080.jpg')
//   },
//   {
//     "CompanyName": "Fenniarail",
//     "CompanyUrl": "https://www.fenniarail.fi",
//     "image": require('../../assets/images/sponsors_logos2020/fenniarail_1080.jpg')
//   },
//   {
//     "CompanyName": "Fracht Finland Oy Ltd",
//     "CompanyUrl": "https://www.fracht.com",
//     "image": require('../../assets/images/sponsors_logos2020/Fracht_1080.jpg')
//   },
//   {
//     "CompanyName": "Greencarrier�Liner Agency Finland Oy",
//     "CompanyUrl": "https://www.greencarrier.fi",
//     "image": require('../../assets/images/sponsors_logos2020/Greencarrier_1080.jpg')
//   },
//   {
//     "CompanyName": "Hacklin Oy",
//     "CompanyUrl": "https://www.hacklin.fi",
//     "image": require('../../assets/images/sponsors_logos2020/hacklin_1080.jpg')
//   },
//   {
//     "CompanyName": "Helsingin Satama",
//     "CompanyUrl": "https://www.portofhelsinki.fi",
//     "image": require('../../assets/images/sponsors_logos2020/portofhelsinki_1080.jpg')
//   },
//   {
//     "CompanyName": "Hooli Stevedoring Oy",
//     "CompanyUrl": "https://www.hoolistevedoring.fi",
//     "image": require('../../assets/images/sponsors_logos2020/Hoolin_1080.jpg')
//   },
//   {
//     "CompanyName": "Kalajoen Satama",
//     "CompanyUrl": "https://www.portofkalajoki.fi",
//     "image": require('../../assets/images/sponsors_logos2020/portofkalajoki_1080.jpg')
//   },
//   {
//     "CompanyName": "MSC",
//     "CompanyUrl": "https://www.msc.com",
//     "image": require('../../assets/images/sponsors_logos2020/MSC_1080.jpg')
//   },
//   {
//     "CompanyName": "Pietarsaaren satama ",
//     "CompanyUrl": "https://www.portofpietarsaari.fi",
//     "image": require('../../assets/images/sponsors_logos2020/portofpietarsaari_1080.jpg')
//   },
//   {
//     "CompanyName": "Porin Satama Oy",
//     "CompanyUrl": "https://www.portofpori.fi",
//     "image": require('../../assets/images/sponsors_logos2020/portofpori_1080.jpg')
//   },
//   {
//     "CompanyName": "Raahen Satama",
//     "CompanyUrl": "https://www.raahensatama.fi",
//     "image": require('../../assets/images/sponsors_logos2020/raahe_1080.jpg')
//   },
//   {
//     "CompanyName": "Rauanheimo M Oy",
//     "CompanyUrl": "https://www.rauanheimo.com",
//     "image": require('../../assets/images/sponsors_logos2020/Rauanheimo_1080.jpg')
//   },
//   {
//     "CompanyName": "Rauman Satama ",
//     "CompanyUrl": "https://www.portofrauma.com",
//     "image": require('../../assets/images/sponsors_logos2020/rauma_1080.jpg')
//   },
//   {
//     "CompanyName": "RP-Group",
//     "CompanyUrl": "https://www.rpgroup.fi",
//     "image": require('../../assets/images/sponsors_logos2020/rpgroup_1080.jpg')
//   },
//   {
//     "CompanyName": "Scan Global Logistics (Finland) Oy",
//     "CompanyUrl": "https://www.scangl.com",
//     "image": require('../../assets/images/sponsors_logos2020/scan_global_1080.jpg')
//   },
//   {
//     "CompanyName": "Steveco Oy",
//     "CompanyUrl": "https://www.steveco.fi",
//     "image": require('../../assets/images/sponsors_logos2020/steveco_1080.jpg')
//   },
//   {
//     "CompanyName": "Timber Exhange",
//     "CompanyUrl": "https://www.timber.exchange",
//     "image": require('../../assets/images/sponsors_logos2020/TE_logo_1080.png')
//   },
//   {
//     "CompanyName": "VR-Yhtymä Oy ",
//     "CompanyUrl": "https://www.vrtranspoint.fi",
//     "image": require('../../assets/images/sponsors_logos2020/VRtranspoint_1080.jpg')
//   }
// ]




const SponsorsScreen = props => {
  const sponsorsData = useSelector(state => state.eventData.sponsorsData)
  console.log(sponsorsData)

  

  return (
    <View>
      <FlatList
        data={sponsorsData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={sponsorsData =>
          <SponsorLogoItem
            link={sponsorsData.item.CompanyUrl}
            imageID={sponsorsData.item.ImageID}
          />
        }
      />
    </View>
  )
}

export default SponsorsScreen
