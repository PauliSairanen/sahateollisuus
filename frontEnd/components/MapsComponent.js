import React from 'react'
import {SafeAreaView, StyleSheet, ScrollView, View,Text, StatusBar,FlatList,Button, Dimensions, Platform, 
Image,} from 'react-native'

import Geolocation from 'react-native-geolocation-service'


import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

const DATAPLACES = [
    {
        title:"Restaurants",
        places:
        [
            "one",
            "two",
            "three",
            "four"
        ]
            
        
    },
    {
        title:"Hotels",
        places:
        [
            "one",
            "two",
            "three",
            "four"
        ]
            
        
    },
]


export default class MapsComponent extends React.Component {
    
    constructor(){  
        super();
    this.state = {  
            locready: false,  
            locwhere: {lat:null, lng:null},  
            locerror: null  
        }  
    };
    
    
      componentDidMount(){  
          //Geolocation.setRNConfiguration();
        let geoOptions = {  
            enableHighAccuracy:false,  
            timeOut: 20000, //20 second  
          //  maximumAge: 1000 //1 second  
        };  
        Geolocation.setRNConfiguration(geoOptions);
        this.setState({locready:false, locerror: null });  
        
        console.log("this:");
        console.log(this);
        console.log("navigator:");
        console.log(Geolocation);
        console.log("end:");
        
        
        Geolocation.getCurrentPosition( this.geoSuccess,  
            this.geoFailure,  
            geoOptions);  
    } 
    
    geoSuccess = (position) => {  
    //console.log(position.coords.latitude);  

    this.setState({  
        locready:true,  
        locwhere: {lat: position.coords.latitude,lng:position.coords.longitude }  
    })  
    };  
    geoFailure = (err) => {  
        this.setState({locerror: err.message});  
    };      

   

    
  render() {
      this.data=DATAPLACES;
    return (
      
      <ScrollView>
      <View style={styles2.container}>
        <View style={styles2.map}>
        <Image  source={require("./images/map2.png")} />
        </View>

        <View>
            <Text style={styles2.placetitle}>{this.data[0].title}</Text>
            {this.data[0].places.map( (dv)=><Text style={styles2.placeone}>{dv}</Text> )}
        </View>
        
        <View>
            <Text style={styles2.placetitle}>{this.data[1].title}</Text>
            {this.data[1].places.map( (dv)=><Text style={styles2.placeone}>{dv}</Text> )}
        </View>
        <View >  
            { !this.state.locready && (  
                <Text >Using Geolocation in React Native.</Text>  
            )}  
            { this.state.locerror && (  
                <Text >Error: {this.state.locerror}</Text>  
            )}  
            { this.state.locready && (  
                <View >
                <Text>lat:{this.state.locwhere.lat}</Text>
                <Text>lng:{this.state.locwhere.lng}</Text>
                </View>
                
            )}  
        </View>  

      </View>
      </ScrollView>
    );
  }
}


const styles2 = StyleSheet.create({
  container: {
    
    
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },

  map:{
      alignItems: "center",
      
      width: (Dimensions.get('window').width / 100)*95,
      backgroundColor: '#dfdfdf',
  },
  placetitle:{
      backgroundColor: '#FFB400',
      marginLeft: (Dimensions.get('window').width / 100)*5,
      marginRight: (Dimensions.get('window').width / 100)*5,
      paddingLeft: 5,
      fontSize: 20,
      width: (Dimensions.get('window').width / 100)*95,
  },
  placeone:{
      backgroundColor: '#FFB400',      
      marginRight: (Dimensions.get('window').width / 100)*5,
      marginLeft: (Dimensions.get('window').width / 100)*5,
      paddingLeft: 10,
      fontSize: 16,
      width: (Dimensions.get('window').width / 100)*95,
  },
});
