import React, { Component } from 'react';
import Modal from 'react-native-modal';
import { Text, TouchableOpacity, View } from 'react-native';


export default class AddEntryModal extends Component {

  constructor(props) {
    super(props);
    this.state = {

      ModalVisible: false
    }
  }

  // showModal() {   
  //   setState({ modalVisible: true })
  // }
  // hideModal(){
  //   setState({ modalVisible: false })
  // } 

  render () {
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={ this.props.modalVisible }>
          <View style={{ flex: 1 }}>
            <Text>Hello World!</Text>
          </View>
        </Modal>
      </View>
    )
  }
}


  


