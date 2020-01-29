import React from 'react'
import { View, StyleSheet, FlatList } from 'react-native'

import SponsorLogoItem from '../../components/SponsorLogoItem'

import dbSchenker from '../../assets/images/sponsors_logos2020/db-schenker_1080.jpg'
import DHL from '../../assets/images/sponsors_logos2020/DHL_1080.jpg'
import Euroports from '../../assets/images/sponsors_logos2020/Euroports_1080.jpg'
import Fenniarail from '../../assets/images/sponsors_logos2020/fenniarail_1080.jpg'
import Fracht from '../../assets/images/sponsors_logos2020/Fracht_1080.jpg'
import Greencarrier from '../../assets/images/sponsors_logos2020/Greencarrier_1080.jpg'
import hacklin from '../../assets/images/sponsors_logos2020/hacklin_1080.jpg'
import Hoolin from '../../assets/images/sponsors_logos2020/Hoolin_1080.jpg'
import MSC from '../../assets/images/sponsors_logos2020/MSC_1080.jpg'
import portofhelsinki from '../../assets/images/sponsors_logos2020/portofhelsinki_1080.jpg'
import portofpietarsaari from '../../assets/images/sponsors_logos2020/portofpietarsaari_1080.jpg'
import portofpori from '../../assets/images/sponsors_logos2020/portofpori_1080.jpg'
import raahe from '../../assets/images/sponsors_logos2020/raahe_1080.jpg'
import Rauanheimo from '../../assets/images/sponsors_logos2020/Rauanheimo_1080.jpg'
import rauma from '../../assets/images/sponsors_logos2020/rauma_1080.jpg'
import rpgroup from '../../assets/images/sponsors_logos2020/rpgroup_1080.jpg'
import scanGlobal from '../../assets/images/sponsors_logos2020/scan_global_1080.jpg'
import steveco from '../../assets/images/sponsors_logos2020/steveco_1080.jpg'
import VRtranspoint from '../../assets/images/sponsors_logos2020/VRtranspoint_1080.jpg'

arrayOfImages = [dbSchenker, DHL, Euroports, Fenniarail, Fracht, Greencarrier, hacklin, Hoolin, MSC, MSC, portofpietarsaari, portofpori, raahe, Rauanheimo, rauma, rpgroup, scanGlobal, steveco, VRtranspoint]

export const companyLinksAndImages = [
  {
    "CompanyName": "DB Schenker",
    "CompanyUrl": "https://www.dbschenker.com",
    "image": dbSchenker
  },
  {
    "CompanyName": "DHL",
    "CompanyUrl": "https://www.dhl.com",
    "image": DHL
  },
  {
    "CompanyName": "Euroports Finland",
    "CompanyUrl": "https://www.euroports.fi",
    "image": Euroports
  },
  {
    "CompanyName": "Fenniarail",
    "CompanyUrl": "https://www.fenniarail.fi",
    "image": Fenniarail
  },
  {
    "CompanyName": "Fracht Finland Oy Ltd",
    "CompanyUrl": "https://www.fracht.com",
    "image": Fracht
  },
  {
    "CompanyName": "Greencarrier�Liner Agency Finland Oy",
    "CompanyUrl": "https://www.greencarrier.fi",
    "image": Greencarrier
  },
  {
    "CompanyName": "Hacklin Oy",
    "CompanyUrl": "https://www.hacklin.fi",
    "image": hacklin
  },
  {
    "CompanyName": "Helsingin Satama",
    "CompanyUrl": "https://www.portofhelsinki.fi",
    "image": portofhelsinki
  },
  {
    "CompanyName": "Hooli Stevedoring Oy",
    "CompanyUrl": "https://www.hoolistevedoring.fi",
    "image": Hoolin
  },
  {
    "CompanyName": "Kalajoen Satama",
    "CompanyUrl": "https://www.portofkalajoki.fi",
    "image": ""
  },
  {
    "CompanyName": "MSC",
    "CompanyUrl": "https://www.msc.com",
    "image": MSC
  },
  {
    "CompanyName": "Pietarsaaren satama ",
    "CompanyUrl": "https://www.portofpietarsaari.fi",
    "image": portofpietarsaari
  },
  {
    "CompanyName": "Porin Satama Oy",
    "CompanyUrl": "https://www.portofpori.fi",
    "image": portofpori
  },
  {
    "CompanyName": "Raahen Satama",
    "CompanyUrl": "https://www.raahensatama.fi",
    "image": raahe
  },
  {
    "CompanyName": "Rauanheimo M Oy",
    "CompanyUrl": "https://www.rauanheimo.com",
    "image": Rauanheimo
  },
  {
    "CompanyName": "Rauman Satama ",
    "CompanyUrl": "https://www.portofrauma.com",
    "image": rauma
  },
  {
    "CompanyName": "RP-Group",
    "CompanyUrl": "https://www.rpgroup.fi",
    "image": rpgroup
  },
  {
    "CompanyName": "Scan Global Logistics (Finland) Oy",
    "CompanyUrl": "https://www.scangl.com",
    "image": scanGlobal
  },
  {
    "CompanyName": "Steveco Oy",
    "CompanyUrl": "https://www.steveco.fi",
    "image": steveco
  },
  {
    "CompanyName": "VR-Yhtymä Oy ",
    "CompanyUrl": "https://www.vrtranspoint.fi",
    "image": VRtranspoint
  }
]

const SponsorsScreen = props => {
  return (
    <View>
      <FlatList
        data={companyLinksAndImages}
        keyExtractor={(item) => item.index}
        renderItem={companyLinksAndImages =>
          <SponsorLogoItem
            link={companyLinksAndImages.item.CompanyUrl}
            image={companyLinksAndImages.item.image}
          />
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({

})

export default SponsorsScreen
