import React from 'react';
import { StyleSheet, Text, TextInput, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Header from '../components/Header';
import Item from '../components/Item';
import Loading from  '../components/Loading';

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
          _id
          marca
          modelo
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
      limit:20,
      page:1,
      data:'',
    }
  }

  render() {
    var page = this.state.page;
    var dataArray = [];
    for (i = 0; i < this.state.page; i++){
      dataArray.push({});
    }
    var lastPage = '';
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
            onChangeText={(searchBar) => {
              this.setState({searchBar});
              this.setState({page:1});
            }}
          />
        </View>
        <ScrollView style={{padding:10,paddingTop:5,paddingBottom:5, backgroundColor:'transparent', flexDirection: 'column', flex:1}}
          onScroll={({nativeEvent}) => {
            if (isCloseToBottom(nativeEvent)) {
              page++;
              this.setState({page:page})
            }
          }}
          scrollEventThrottle={400}
        >

          {dataArray.map((itemLista,j) => {
            return(
              <Query query={queryVeiculos} variables={{page:j+1, limit:this.state.limit, query:this.state.searchBar}} fetchPolicy={'cache-and-network'} key={j}>
                {({ loading, error, data, fetchMore }) => {
                  if (loading) return (
                    <Loading />
                  )
                  if (error) return <Text>Erro</Text>;
                  if (j < data.buscaVeiculo.pageInfo.pages){
                    return(
                      <View key={j}>
                      {data.buscaVeiculo.edges.map((itemLista,k) => {
                          return (
                            <Item key={k} node={itemLista.node} onPressItem={() => {this.props.navigation.navigate('Detalhes',{id:itemLista.node._id})}}/>
                          )
                        })
                      }
                      </View>
                    )
                  }
                  return (null)
                }}
              </Query>
            )
          })}
          <View style={{height:20}}></View>
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
