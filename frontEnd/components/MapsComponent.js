import React from 'react'
import {SafeAreaView, StyleSheet, ScrollView, View,Text, StatusBar,FlatList,Button, Dimensions, Platform, 
Image,} from 'react-native'

import Geolocation from 'react-native-geolocation-service'


import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import MapboxGL from "@react-native-mapbox-gl/maps";
//import openMap from 'react-native-open-maps';

//change this token, i have warned!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
MapboxGL.setAccessToken("pk.eyJ1IjoiZGlhZ3JhbWNhc2tldCIsImEiOiJjazNza2dkYzAwNXk5M2NuaHE5MjE0ZTlvIn0.awW0nMVF-sPpFQnxrPQdJA");

const DATAPLACES = {
    mainplace:{
        lat:61.006066112,
        lng:25.665136111
    },
    
    restaurants:
    [
    {
        name:"one",
        
        lat:61.005584722,
        lng:25.663676668
        
        
    },
    {
        name:"two",
        
        lat:61.005084722,
        lng:25.663676668
        
        
    }
    ],
    hotels:
    [
    {
        name:"nine",
        
        lat:61.004584722,
        lng:25.663676668
        
        
    }
    ],
    
};




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
          MapboxGL.setTelemetryEnabled(false);
          //Geolocation.setRNConfiguration();
        let geoOptions = {  
            enableHighAccuracy:false,  
            timeOut: 20000, //20 second  
          //  maximumAge: 1000 //1 second  
        };  
        Geolocation.setRNConfiguration(geoOptions);
        this.setState({locready:false, locerror: null });  
        
        //console.log("this:");
        //console.log(this);
        //console.log("navigator:");
        //console.log(Geolocation);
        //console.log("end:");
        
        
        Geolocation.getCurrentPosition( this.geoSuccess,  
            this.geoFailure,  
            geoOptions);  
    } 
    
    geoSuccess = (position) => {  
    //console.log(position.coords.latitude);  

        //tmpa = new MapboxGL.Camera();
        /*
        console.log("~~~~~");
        console.log(this.props.followUserLocation);
        console.log("~~~~~");
        
        tmpa.setCamera({
        centerCoordinate: [1, 2],
        zoomLevel: 16,
        animationDuration: 2000,
        
        }) 
        */
        
    this.setState({  
        locready:true,  
        locwhere: {lat: position.coords.latitude,lng:position.coords.longitude }  
    })  
    };  
    geoFailure = (err) => {  
        this.setState({locerror: err.message});  
    };      


   
	renderAnnotationsres(num) {
        if(this.data.restaurants[num] != undefined){
		return (
            
                <MapboxGL.PointAnnotation
                    key={this.data.restaurants[num].name}
                    id={this.data.restaurants[num].name}
                    coordinate={[this.data.restaurants[num].lng,this.data.restaurants[num].lat]}>
                    <View style={styles2.annotationContainerBlue}>
                        <View style={styles2.annotationFillBlue} />
                    </View>
                    <MapboxGL.Callout title={this.data.restaurants[num].name} />
                </MapboxGL.PointAnnotation>
                
            
        
		);}
		else
        {return(null);}
            
	}
	
    renderAnnotationshot(num) {
        if(this.data.hotels[num] != undefined){
		return (
            
                <MapboxGL.PointAnnotation
                    key={this.data.hotels[num].name}
                    id={this.data.hotels[num].name}
                    coordinate={[this.data.hotels[num].lng,this.data.hotels[num].lat]}>
                    <View style={styles2.annotationContainerRed}>
                        <View style={styles2.annotationFillRed} />
                    </View>
                    <MapboxGL.Callout title={this.data.hotels[num].name} />
                </MapboxGL.PointAnnotation>
                
            
        
		);}
		else
        {return(null);}
            
	}
	
    renderAnnotationsmain() {
        
		return (
            
                <MapboxGL.PointAnnotation
                    key="main"
                    id="main"
                    coordinate={[this.data.mainplace.lng,this.data.mainplace.lat]}>
                    <View style={styles2.annotationContainerGreen}>
                        <View style={styles2.annotationFillGreen} />
                    </View>
                    <MapboxGL.Callout title="main" />
                </MapboxGL.PointAnnotation>
                
            
        
		);
		    
	}
	renderAnnotationsblue(namee,lngg,latt) {
        
		return (
            
                <MapboxGL.PointAnnotation
                    key={namee}
                    id={namee}
                    coordinate={[lngg,latt]}>
                    <View style={styles2.annotationContainerGreen}>
                        <View style={styles2.annotationFillGreen} />
                    </View>
                    <MapboxGL.Callout title={namee} />
                </MapboxGL.PointAnnotation>
                
            
        
		);
		    
	}
    
  render() {
      this.data=DATAPLACES;
    return (
      
      <ScrollView>
      <View style={styles2.container}>
        <View style={styles2.map}>
             <View style={styles2.map2}>
            
                <View >
                    <MapboxGL.MapView style={styles2.map2}>
                        <MapboxGL.Camera 
                        centerCoordinate={[this.data.mainplace.lng,this.data.mainplace.lat]}
                        zoomLevel={15} >
                         
                        </MapboxGL.Camera>
                        {this.renderAnnotationsmain()}
                        {this.renderAnnotationsres(0)}
                        {this.renderAnnotationsres(1)}
                        {this.renderAnnotationsres(2)}
                        {this.renderAnnotationshot(0)}
                        {this.renderAnnotationshot(1)}
                        {this.renderAnnotationshot(2)}                        
                    </MapboxGL.MapView>
                </View>
            </View>
        </View>

 
        <View>
            <Text style={styles2.placetitle}>restaurants</Text>
            {this.data.restaurants.map( (dv)=><Text onPress={ (a)=>{} } style={styles2.placeone}>{dv.name}</Text> )}
        </View>
        
        <View>
            <Text style={styles2.placetitle}>hotels</Text>
            {this.data.hotels.map( (dv)=><Text style={styles2.placeone}>{dv.name}</Text> )}
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
      flex:1,                                
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
    map2: {
    height: (Dimensions.get('window').height / 100)*50,
    width: (Dimensions.get('window').width / 100)*100,
    backgroundColor: "tomato"
  },
    map3: {
    flex: 1
  },
  	annotationContainerBlue: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#0000c040',
		borderRadius: 15
	},
	annotationFillBlue: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#0000c080',
		transform: [{ scale: 0.6 }]
	},
    annotationContainerRed: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#ff400040',
		borderRadius: 15
	},
	annotationFillRed: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#ff400080',
		transform: [{ scale: 0.6 }]
	},
    annotationContainerGreen: {
		width: 30,
		height: 30,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#00c00040',
		borderRadius: 15
	},
	annotationFillGreen: {
		width: 30,
		height: 30,
		borderRadius: 15,
		backgroundColor: '#00c00080',
		transform: [{ scale: 0.6 }]
	},
    centerOnly:{
        textAlign: 'center',
        textAlignVertical: 'center'
    }
});
