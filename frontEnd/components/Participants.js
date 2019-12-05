import React, { Component } from "react";

import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import Communications from 'react-native-communications';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { 
    Accordion,
    Container, 
    Content
} from "native-base";

import { existsTypeAnnotation, functionTypeAnnotation } from "@babel/types";

/**
 * Here the JSON is converted to a form that accordeon understands
 */

let participantsData = require('./OsallistujalistaLopullinenKesken.json')
const companiesArray = []

function createArray() {

  participantsData.forEach(element => {

    const temp = {};
    temp['company'] = element.company;
    temp["content"] = {};
    temp["content"]["participantsArray"] = [];

    element.participant.forEach(participant => {

      let tempArray = [];

      tempArray.push(participant.lastname + ', ' + participant.firstname + ' ('+ participant.country + ')\n' + participant.role);
      tempArray.push(participant.email);
      tempArray.push(participant.telephone);

      temp["content"]["participantsArray"].push(tempArray);

    });

    companiesArray.push(temp);

  });

  companiesArray.forEach(element => {
      console.log(element);
  });
};

/**
 * This function formats the content in the accordion
 */

function formatContent(content) {

  let returnable = [];

  content.participantsArray.forEach(participant => {

    returnable.push(<Text style={{padding: 1}}></Text>)

    returnable.push(<Text style={styles.content}>{participant[0]}</Text>);

    /**
     * Email formatting
     */

    participant[1].forEach(value =>{ 
      returnable.push(
      <TouchableOpacity onPress={() => 
      Communications.email([value],null,null,null, null)} activeOpacity={0.7}>
        
        <Text style={styles.content}><Icon style={styles.contact} name="email" /> {value}</Text>
      </TouchableOpacity>)
    });

    /**
     * Phone call formatting
     */

    participant[2].forEach(value =>{
      returnable.push(
      <TouchableOpacity onPress={() => 
      Communications.phonecall(value, true)} activeOpacity={0.7}>
        
        <Text style={styles.content}><Icon style={styles.contact} name="phone" /> {value}</Text>
      </TouchableOpacity>)
    });

    returnable.push(<Text style={{padding: 1}}></Text>)

  })

  return (
    <View>
      {returnable}
    </View>
  )

}

export default class AccordionParticipants extends Component {

  /** Render functions
  * "render()" is the main function that calls all other functions
  */

  /** This renders to the device */
    
  render() {
    if (companiesArray.length === 0) {
      createArray();
    }
    
      return (
        <Container>
              <Content padder style={{ backgroundColor: "white" }}>
                
                <Accordion
                  dataArray={companiesArray}
                  animation={true}
                  expanded={true}
                  renderHeader={this._renderHeader}
                  renderContent={this._renderContent}
                />
                
              </Content>
            </Container>
      );
  }
    
  /** This renders the company's name in to the accordion header*/
  
  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#FFB400" }}>
        <Text style={{ 
          color: "#ffffff",
          fontFamily: "Rubik Medium",
          fontSize: 21,
          letterSpacing: 0
           }}>
          {" "}{item.company}
        </Text>
          {expanded
          ? <Icon style={{ color: "#ffffff", fontSize: 21 }} name="arrow-up" />
          : <Icon style={{ color: "#ffffff", fontSize: 21 }} name="arrow-down" />}
      </View>
    );
  }

  /** This renders the participants info in to the accordion content*/

  _renderContent(item) {
    return (
      formatContent(item.content)
    );
  };

}

const styles = StyleSheet.create({
  content: {

    backgroundColor: "#ffffff",
    color: "#4c4c4c",
    fontFamily: "Open Sans Condenced Light",
    letterSpacing: 0,
    fontSize: 18,
    marginLeft: 40
    
  },
  participant: {

    

  },
  contact: {

    color: "#1e90ff", 
    fontSize: 25,
    marginLeft: 40,

  }
});