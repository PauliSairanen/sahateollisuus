import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet, FlatList } from "react-native";

import Icon from "react-native-vector-icons/MaterialIcons";


function Item({ time, nameOfPerformance, performer, company, title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}> {time} </Text>
      <Text style={styles.title}> {nameOfPerformance} </Text>
      <Text style={styles.title}> {performer} </Text>
      <Text style={styles.title}> {company} </Text>
      <Text style={styles.title}> {title} </Text>
      <Text> ______________________ </Text>
    </View>
  )
}

export default class SchedulesComponent2 extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: props.data,
      expanded: false,
    }
  }
  render() {

    // We have the array of data
    console.log(this.props.data)
    return (

      <View>
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
  }

});