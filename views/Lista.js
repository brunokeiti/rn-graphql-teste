import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import Header from '../components/Header';
import Item from '../components/Item';

import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const ExchangeRates = () => (
  <Query
    query={gql`
      query {
        buscaVeiculo{
          edges{
            node{
              marca
              modelo
              _id
            }
          }
        }
      }
    `}
  >
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>;
      if (error) return <Text>Error :(</Text>;

      return data.buscaVeiculo.edges.map(({ node }) => (
        <Item node={node} key={node.modelo}/>
      ));
    }}
  </Query>
);

export default class Lista extends React.Component {

  constructor ( props ){
    super ( props );
    this.state = {
      title: 'Menu Principal',
      loading: true,
    }
  }

  render() {
    return (
      <View>
        <Header
          onPressBack={() => {}}
          noBack={true}
          title={this.state.title}
        />
        <ExchangeRates />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});