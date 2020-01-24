import React, { Component } from "react";

import {
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { 
    Accordion,
    Container, 
    Content, 
    Icon
} from "native-base";
import { existsTypeAnnotation } from "@babel/types";

/**
 * Here the JSON is converted to a form that the lists understand
 */

let participantsData = require('./OsallistujalistaLopullinenKesken.json.js')
const companiesArray = []

function createArray() {
 
  participantsData.forEach(element => {
 
    const temp = {};
    temp["company"] = element.company;
    let tempString = "";
    let i = 0;
 
    element.participant.forEach(participant => {
 
      temp[i] = {}
      tempString = participant.lastname + ', ' + participant.firstname + ' ('+ participant.country + ')\n'
      + participant.role + '\n';
      temp[i]["participant"] = tempString;
     
      temp[i]["email"] = participant.email.join('\n') + '\n'
      temp[i]["telephone"] = participant.telephone.join('\n') + '\n\n';
      i++
 
    });
 
    companiesArray.push(temp);
 
  });
 
  companiesArray.forEach(element => {
      console.log(element);
  })
 
};

/**
 * To Do: Format participant email and phonenumber
 */

function formatPerson(person) {

  return (
    <Text style={styles.content}>
      {person}
    </Text>
  )
}

function formatContact(bar) {
  return (

    <TouchableOpacity>
      <Text>
        "teksti"
      </Text>
    </TouchableOpacity>
    
  )
}



/** Render functions
 * "render()" is the main function that calls all other functions
 */

export default class AccordionParticipants extends Component {
    
  /** This renders the company's name */
  
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

  /** This renders the participants info */

  _renderContent(item) {

    const tempArray = [];

    let returnable;
    let name = item[0].participant;
    let contact = item[0].email;

    tempArray.push(
      
      <View>
        <Text>
          {name}
        </Text>
        <TouchableOpacity>
          <Text>
            {contact}
          </Text>
        </TouchableOpacity>
      </View>
      
    )

    return (
      {returnable}
    );
  };

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

}

const styles = StyleSheet.create({
  content: {

    backgroundColor: "#ffffff",
    padding: 10,
    color: "#4c4c4c",
    fontFamily: "Open Sans Condenced Light",
    letterSpacing: 0
    
  }
});