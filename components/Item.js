import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import { NavigationActions } from 'react-navigation';

export default class Item extends React.Component {
  constructor ( props ){
    super ( props );
  }
  render() {
    return (
      <TouchableOpacity style={styles.item} onPress={this.props.onPressItem}>
        <Text style={styles.itemMarca}>{`${this.props.node.marca}`}</Text>
        <Text style={styles.itemModelo}>{`${this.props.node.modelo}`}</Text>
      </TouchableOpacity>

    );
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#fff',
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: '#cccccc',
    borderRadius: 5,
    padding: 10,
    marginTop: 5,
  },
  itemMarca: {
    color: '#333333',
    fontSize: 18,
  },
  itemModelo: {
    color: '#333333',
    fontSize: 14,
  },
});
