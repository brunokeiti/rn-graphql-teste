import React, { Component } from 'react';
import { createStackNavigator } from 'react-navigation';
import Lista from './views/Lista';
import Detalhes from './views/Detalhes';

import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const client = new ApolloClient({
  uri: "https://api.nimble.com.br/veiculoQL/v1/gql"
});

const MainStackNavigator = createStackNavigator(
  {
    Lista: {
      screen: Lista,
    },
    Detalhes: {
      screen: Detalhes,
    },
  },
  {
    initialRouteName: 'Lista',
    headerMode: "none",
  }
);

class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <MainStackNavigator />
      </ApolloProvider>
    );
  }
}

export default App;
