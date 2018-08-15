import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

export default class Item extends React.Component {
  constructor ( props ){
    super ( props );
  }
  render() {
    return (
      <View>
        <Text>{`${this.props.node.marca}`}</Text>
        <Text>{`${this.props.node.modelo}`}</Text>
      </View>

    );
  }
}
