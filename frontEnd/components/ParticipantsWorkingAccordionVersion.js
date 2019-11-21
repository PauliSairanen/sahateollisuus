import React, { Component } from "react";
import {
  Dimensions, SafeAreaView, View, FlatList, StyleSheet, Text
} from 'react-native';
import { Container, Header, Content, Accordion, 
  Icon} from "native-base";

let participantsData = require('./OsallistujalistaLopullinenKesken.json');
const participantArray = [];

function createArray() {

  participantsData.forEach(element => {
    
    element.participant.forEach(participant => {

      const temp = {};

      temp["title"] = participant.lastname + ' ' + participant.firstname + ', ' + participant.role;
      
      temp["content"] = participant.contact.email.join('\n') + '\n' + participant.contact.telephone.join('\n');

      participantArray.push(temp);

    })
        
  });

  console.log(participantArray);

};

export default class AccordionCustomHeaderContent extends Component {

  _renderHeader(item, expanded) {
    return (
      <View style={{
        flexDirection: "row",
        padding: 10,
        justifyContent: "space-between",
        alignItems: "center" ,
        backgroundColor: "#A9DAD6" }}>
      <Text style={{ fontWeight: "600" }}>
          {" "}{item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
          : <Icon style={{ fontSize: 18 }} name="add-circle" />}
      </View>
    );
  }
  _renderContent(item) {
    return (
      <Text
        style={{
          backgroundColor: "#e3f1f1",
          padding: 10,
          fontStyle: "italic",
        }}
      >
        {item.content}
      </Text>
    );
  }
  render() {
    createArray();
    return (
      <Container>
        <Content padder style={{ backgroundColor: "white" }}>
          
          <Accordion
            dataArray={participantArray}
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