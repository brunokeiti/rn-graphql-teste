import React from 'react';
import { StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';

export default class Item extends React.Component {
  constructor ( props ){
    super ( props );
  }
  render() {
    return (
      <View style={styles.view}>
        <ActivityIndicator size="large" color={'grey'}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    height:100,
  },
});
