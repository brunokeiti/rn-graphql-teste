import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, ListView, KeyboardAvoidingView, FlatList } from 'react-native';
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
  return layoutMeasurement.height + contentOffset.y >=
    contentSize.height - paddingToBottom;
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
        <View style={{padding:10,paddingTop:5,paddingBottom:20, backgroundColor:'transparent', flexDirection: 'column', flex:1}}>

          <Query query={queryVeiculos} variables={{page:this.state.page, limit:this.state.limit, query:this.state.searchBar}} fetchPolicy={'cache-and-network'}>
            {({ loading, error, data, fetchMore }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>Erro :(</Text>;
              //console.log(data.buscaVeiculo.edges);
              return (
                <FlatList
                  data={data.buscaVeiculo.edges}
                  keyExtractor={(item, index) => item.node._id}
                  onEndReachedThreshold={1}
                  onEndReached={(xxx) => {
                    this.setState({page: this.state.page + 1})
                    console.log(this.state.page);
                    fetchMore({
                      variables:{page:this.state.page},
                      updateQuery: (previousResult, { fetchMoreResult }) => {
                        if (!fetchMoreResult) return previousResult;
                      }
                    });
                  }}
                  renderItem={({item}) => <Item node={item.node}  onPressItem={() => {this.props.navigation.navigate('Detalhes',{id:item.node._id})}}/>}
                />
              )
            }}
          </Query>

        </View>
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
