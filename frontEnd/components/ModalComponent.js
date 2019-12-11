import React, { Component } from 'react';
import { Text, View, Button, Modal, StyleSheet } from 'react-native';

export default class ModalComponent extends Component {
  constructor(props) {
    super(props)
  }

  state = {
    modalVisible: false,
  }

  openModal() {
    this.setState({modalVisible:true});
  }

  closeModal() {
    this.setState({modalVisible:false});
  }

  componentWillReceiveProps(nextProps){
    console.log('Entering modal component')
    if(this.props.openModal== true) {

      console.log('Opening modal')
      this.openModal()
    }
  }


  render() {
    console.log('Element is rendering')
    return (
        <View style={styles.container}>
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
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
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