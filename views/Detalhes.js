import React from 'react';
import { StyleSheet, Text, View, ScrollView, KeyboardAvoidingView } from 'react-native';
import { NavigationActions } from 'react-navigation';

import Header from '../components/Header';
import Loading from '../components/Loading';

import ApolloClient from "apollo-boost";
import { Query, ApolloProvider } from "react-apollo";
import gql from "graphql-tag";

const detalhesVeiculo = gql`
  query detalhesVeiculo($id:ID!){
    veiculo(id:$id){
      _id,
      marca,
      modelo,
      ano_fabricacao,
      ano_modelo,
      combustivel,
      cor,
      usado
    }
  }
`

export default class Detalhes extends React.Component {
  constructor ( props ){
    super ( props );
    this.state = {
      title: 'Detalhes',
      loading: true,
      id: this.props.navigation.state.params.id,
    }
  }

  render() {
    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Header
          onPressBack={() => {this.props.navigation.dispatch(NavigationActions.back())}}
          backButton={true}
          title={this.state.title}
          onPressRight={() => {this.props.navigation.navigate('Editar',{id:this.state.id})}}
          rightButton={'edit'}
        />
        <ScrollView contentContainerStyle={{padding:10,paddingTop:5,paddingBottom:20, backgroundColor:'transparent', flexDirection: 'column',}}>
        <Query query={detalhesVeiculo} variables={{id:this.state.id}}>
          {({ loading, error, data }) => {
            if (loading) return (
              <Loading />
            )
            if (error) return <Text>Erro</Text>;
            return (
              <View>
                <Text style={styles.label}>Marca</Text>
                <Text style={styles.field}>{data.veiculo.marca ? data.veiculo.marca : "Sem marca"}</Text>
                <Text style={styles.label}>Modelo</Text>
                <Text style={styles.field}>{data.veiculo.modelo ? data.veiculo.modelo : "Sem modelo"}</Text>
                <Text style={styles.label}>Ano / Fabricação</Text>
                <Text style={styles.field}>{data.veiculo.ano_fabricacao ? data.veiculo.ano_fabricacao : "-"}</Text>
                <Text style={styles.label}>Ano / Modelo</Text>
                <Text style={styles.field}>{data.veiculo.ano_modelo ? data.veiculo.ano_modelo : "-"}</Text>
                <Text style={styles.label}>Tipo Combustível</Text>
                <Text style={styles.field}>{data.veiculo.combustivel ? data.veiculo.combustivel : "Não informado"}</Text>
                <Text style={styles.label}>Cor</Text>
                <Text style={styles.field}>{data.veiculo.cor ? data.veiculo.cor : "Não informado"}</Text>
                <Text style={styles.label}>Usado</Text>
                <Text style={styles.field}>{data.veiculo.usado ? "Sim" : "Não"}</Text>
              </View>
            );
          }}
        </Query>
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}

const styles = StyleSheet.create({
  label:{
    marginTop: 5,
    color: '#666666',
    fontSize: 14,
  },
  field:{
    color: '#333333',
    fontSize: 18,
    marginBottom: 5,
  },
});
