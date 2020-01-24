import React, {Component} from 'react';
import { View, TouchableOpacity, Text, FlatList} from "react-native";

/**
 * Here the JSON is converted to a form that the lists understand
 */

let participantsData = require('./OsallistujalistaLopullinenKesken.json')
export default class Accordian extends Component{

    constructor(props) {
        super(props);
        this.state = participantsData;
    }

  /** This renders to the device */
  
  render() {
    return (
       <View>
            <TouchableOpacity onPress={()=>this.toggleExpand()}>
                <Text >{this.props.company}</Text>
            </TouchableOpacity>
            <View/>
            {
                this.state.expanded &&
                <View>
                    <FlatList
                    data={this.state.participant}
                    numColumns={1}
                    scrollEnabled={false}
                    renderItem={({item, index}) => 
                        <View>
                            <TouchableOpacity onPress={()=>this.onClick(index)}>
                                <Text >{item.firstname}</Text>
                            </TouchableOpacity>
                            <View/>
                        </View>
                    }/>
                </View>
            }
            
       </View>
    )
  }

  onClick=(index)=>{
    const temp = this.state.company.slice()
    temp[index].value = !temp[index].value
    this.setState({company: temp})
  }

  toggleExpand=()=>{
    this.setState({expanded : !this.state.expanded})
  }

}