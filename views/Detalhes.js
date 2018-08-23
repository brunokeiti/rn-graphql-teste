import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

import Header from '../components/Header';

export default class Detalhes extends React.Component {
  constructor ( props ){
    super ( props );
    this.state = {
      title: 'Detalhes',
      loading: true,
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Header
          onPressBack={() => {this.props.navigation.dispatch(NavigationActions.back())}}
          noBack={false}
          title={this.state.title}
        />
        <ScrollView contentContainerStyle={{padding:10,paddingTop:5,paddingBottom:20, backgroundColor:'transparent', flexDirection: 'column',}}>

        </ScrollView>
      </View>
    );
  }
}
