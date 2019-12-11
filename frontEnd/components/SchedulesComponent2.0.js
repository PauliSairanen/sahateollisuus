import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList, Modal, Alert, Button } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";

import ModalComponent from './ModalComponent'

function Item({ time, nameOfPerformance, performer, company, title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}> {time} </Text>
      <Text style={styles.title}> {nameOfPerformance} </Text>
      <Text style={styles.title}> {performer} </Text>
      <Text style={styles.title}> {company} </Text>
      <Text style={styles.title}> {title} </Text>
      <Button title="Click here to show Modal" onPress={() => {
        console.log('Modal button clicked! :D'),
          this.openModal()
      }
      } />


      <Text> ______________________ </Text>
    </View>
  )
}

export default class SchedulesComponent2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      modalVisible: false,

    }
  }

  Item({ time, nameOfPerformance, performer, company, title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}> {time} </Text>
      <Text style={styles.title}> {nameOfPerformance} </Text>
      <Text style={styles.title}> {performer} </Text>
      <Text style={styles.title}> {company} </Text>
      <Text style={styles.title}> {title} </Text>
      <Button title="Click here to show Modal" onPress={() => {
        console.log('Modal button clicked! :D'),
          this.openModal()
      }
      } />


      <Text> ______________________ </Text>
    </View>
  )
}


  openModal() {
    this.setState({ modalVisible: true });
  }

  closeModal() {
    this.setState({ modalVisible: false });
  }


  render() {

    // We have the array of data
    console.log(this.props.data)
    return (


      <View>

        <Modal
          visible={this.state.modalVisible}
          animationType={'slide'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>This is content inside of modal component</Text>
              <Button
                onPress={() => this.closeModal()}
                title="Close modal"
              >
              </Button>
            </View>
          </View>
        </Modal>


        <Button
          onPress={() => this.openModal()}
          title="Open modal"
        />



        <TouchableOpacity style={styles.row} onPress={() => this.toggleExpand()}>
          <Text style={[styles.title, styles.font]}>{this.props.title}</Text>
          <Icon name={this.state.expanded ? 'keyboard-arrow-up' : 'keyboard-arrow-down'} size={30} />
        </TouchableOpacity>
        <View style={styles.parentHr} />
        {
          this.state.expanded &&
          <View style={styles.child}>
            <View>
              <FlatList
                data={this.props.data}
                renderItem={({ item }) =>
                  <View>
                    <Item time={item.time}
                      nameOfPerformance={item.nameOfPerformance}
                      performer={item.performer}
                      company={item.company}
                      title={item.title} />
                  </View>
                }
                keyExtractor={item => item.id}
              />
            </View>
          </View>
        }
      </View>


    )
  }

  toggleExpand = () => {
    this.setState({ expanded: !this.state.expanded })
  }

}


const styles = StyleSheet.create({
  container: {
    borderColor: 'black',
    borderWidth: 5,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'blue',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 56,
    paddingLeft: 25,
    paddingRight: 18,
    alignItems: 'center',

  },
  parentHr: {
    height: 1,
    color: 'white',
    width: '100%'
  },
  child: {
    backgroundColor: 'gray',
    padding: 16,
  },
  container2: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'grey',
  },
  innerContainer: {
    alignItems: 'center',
  },

});

