import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Header from '../components/Header';
import Item from '../components/Item';

import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const queryVeiculos = gql`
  query Busca($page:Int, $limit:Int, $query:String, $type:String){
    buscaVeiculo(page:$page, limit:$limit, query:$query, type:$type){
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

const isCloseToBottom = ({layoutMeasurement, contentOffset, contentSize}) => {
  const paddingToBottom = 20;
  return layoutMeasurement.height + contentOffset.y >= contentSize.height - paddingToBottom;
};

export default class Lista extends React.Component {

  constructor ( props ){
    super ( props );
    this.state = {
      title: 'Lista',
      loading: true,
      searchBar:'',
      limitItem:10,
    }
  }

  render() {
    var pageCount = 1;
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Header
          onPressBack={() => {}}
          backButton={false}
          title={this.state.title}
          onPressRight={() => {this.props.navigation.navigate('Editar',{id:0})}}
          rightButton={'add'}
        />
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            value={this.state.searchBar}
            underlineColorAndroid={'transparent'}
            onChangeText={(searchBar) => {this.setState({searchBar})}}
          />
        </View>
        <ScrollView
          contentContainerStyle={{padding:10,paddingTop:5,paddingBottom:20, backgroundColor:'transparent', flexDirection: 'column',}}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {

            }
          }}
          scrollEventThrottle={400}
          >

          <Query query={queryVeiculos} variables={{page:pageCount, limit:this.state.limitItem, query:this.state.searchBar}} fetchPolicy={'cache-and-network'}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>Erro :(</Text>;
              return data.buscaVeiculo.edges.map(({ node }) => (
                <Item node={node} key={node._id} onPressItem={() => {this.props.navigation.navigate('Detalhes',{id:node._id})}}/>
              ));
            }}
          </Query>

        </ScrollView>
      </KeyboardAvoidingView>
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
    padding:10,
    paddingTop:5,
    paddingBottom:5,
    alignSelf: 'stretch',
  },
});
