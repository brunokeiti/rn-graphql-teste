import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Header from '../components/Header';
import Item from '../components/Item';

import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const queryVeiculos = gql`
  query {
    buscaVeiculo{
      pageInfo{
        hasNextPage
        hasPreviousPage
        pages
        page
      }
      total
      edges{
        node{
          marca
          modelo
          _id
        }
      }
    }
  }
`

export default class Lista extends React.Component {

  constructor ( props ){
    super ( props );
    this.state = {
      title: 'Lista',
      loading: true,
      searchBar: '',
    }
  }

  render() {
    return (
      <View style={{flex:1}}>
        <Header onPressBack={() => {}} noBack={true} title={this.state.title} />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchBar}
            underlineColorAndroid={'transparent'}
            onChangeText={(searchBar) => {this.setState({searchBar})}}
          />
        </View>
        <ScrollView contentContainerStyle={{padding:10,paddingTop:5,paddingBottom:20, backgroundColor:'transparent', flexDirection: 'column',}}>
          <Query query={queryVeiculos}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>Erro :(</Text>;
              return data.buscaVeiculo.edges.map(({ node }) => (
                <Item node={node} key={node.modelo} onPressItem={() => {this.props.navigation.navigate('Detalhes')}}/>
              ));
            }}
          </Query>
        </ScrollView>
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
  searchBar:{
    backgroundColor: '#666666',
    alignItems: 'center',
    padding:10,
    paddingTop:0,
  },
  searchInput:{
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding:5,
    alignSelf: 'stretch',
  },
});

//<Item node={{marca:'teste',modelo:'teste'}} key={'node.modelo'} onPressItem={() => {this.props.navigation.navigate('Detalhes')}}/>
