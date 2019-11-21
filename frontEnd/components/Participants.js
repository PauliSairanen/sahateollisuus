import React, { Component } from "react";

import {
  Text,
  View
} from 'react-native';

import { 
    Accordion,
    Container, 
    Content, 
    Icon
} from "native-base";

/**
 * Here the JSON is converted to a form that the lists understand
 */

let participantsData = require('./OsallistujalistaLopullinenKesken.json');
const companiesArray = [];

function createArray() {

  participantsData.forEach(element => {

    const temp = {};
    temp["company"] = element.company;
    let tempString = "";

    element.participant.forEach(participant => {

      tempString = tempString

      + participant.lastname + ', ' + participant.firstname + ' ('+ participant.country + ')\n'
      + participant.role + '\n'
      
      + participant.email.join('\n') + '\n'
      + participant.telephone.join('\n') + '\n\n';

    })

    temp['participant'] = tempString;

    companiesArray.push(temp);

  });

  companiesArray.forEach(element => {
      console.log(element);
  })

};

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
        backgroundColor: "#A9DAD6" }}>
        <Text style={{ fontWeight: "900" }}>
          {" "}{item.company}
        </Text>
          {expanded
          ? <Icon style={{ fontSize: 18 }} name="arrow-up" />
          : <Icon style={{ fontSize: 18 }} name="arrow-down" />}
      </View>
    );
  }

  /** This renders the participants info */

  _renderContent(item) {
    return (
      <Text
        style={{
        backgroundColor: "#e3f1f1",
        padding: 10,
        fontStyle: "italic",
        }}
        >
        {item.participant}
      </Text>
    );
  }

  /** This makes the accordion item */

  _createAccordion(item) {

    return (
    
      <Content padder style={{ backgroundColor: "white" }}>
                
        <Accordion
          dataArray={item}
          animation={true}
          expanded={true}
          
          renderHeader={this._renderHeader}
          
          renderContent={this._renderContent}
        />
        
      </Content>

    )

  }

  /** This renders to the device */
    
  render() {
    createArray();
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