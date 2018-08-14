import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

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
        <View key={node.modelo}>
          <Text>{`${node.marca}`}</Text>
          <Text>{`${node.modelo}`}</Text>
        </View>
      ));
    }}
  </Query>
);

const client = new ApolloClient({
  uri: "https://api.nimble.com.br/veiculoQL/v1/gql"
});

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View>
          <View style={styles.header}>

          </View>
          <ExchangeRates />
        </View>
      </ApolloProvider>
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
  header: {
    height:20,
  }
});
