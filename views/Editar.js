import React from 'react';
import { StyleSheet, Text, TextInput, View, CheckBox, TouchableOpacity, ScrollView, KeyboardAvoidingView, Picker } from 'react-native';
import { NavigationActions, StackActions } from 'react-navigation';

import Header from '../components/Header';

import ApolloClient from "apollo-boost";
import { Query, Mutation, ApolloProvider } from "react-apollo";
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

const MarcaLista = gql`
{
   __type(name: "MarcaType") {
     enumValues {
       name
     }
   }
}
`

const CombustivelLista = gql`
{
   __type(name: "CombustivelType") {
     enumValues {
       name
     }
   }
}
`

const editarVeiculo = gql`
  mutation editarVeiculo($data:JSON!, $id:ID!) {
    updateVeiculo(data:$data, id:$id)
  }
`
const criarVeiculo = gql`
  mutation criarVeiculo($data:VeiculoInput!) {
    createVeiculo(data:$data)
  }
`
const apagarVeiculo = gql`
  mutation apagarVeiculo($id:ID!) {
    deleteVeiculo(id:$id)
  }
`

const resetAction = StackActions.reset({
  index: 0,
  actions: [NavigationActions.navigate({ routeName: 'Lista' })],
});

export default class Editar extends React.Component {
  constructor ( props ){
    super ( props );
    this.state = {
      loading: true,
      id: this.props.navigation.state.params.id,
    }
  }

  render() {
    if (this.props.navigation.state.params.id == 0){
      title = "Adicionar"
    }else{
      title = "Editar"
    }

    return (
      <KeyboardAvoidingView behavior="padding" style={{flex: 1}}>
        <Header
          onPressBack={() => {this.props.navigation.dispatch(NavigationActions.back())}}
          backButton={true}
          title={title}
          onPressRight={() => {}}
          rightButton={'none'}
        />
        <ScrollView contentContainerStyle={{padding:10,paddingTop:5,paddingBottom:20, backgroundColor:'transparent', flexDirection: 'column',}}>
        {this.state.id != 0 && //Editar
          <Query query={detalhesVeiculo} variables={{id:this.state.id}}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>Erro :(</Text>;
              if (this.state.marca == '' || this.state.marca == null){ this.state.marca = data.veiculo.marca;}
              if (this.state.combustivel == '' || this.state.combustivel == null){ this.state.combustivel = data.veiculo.combustivel;}
              return (
                <View>
                  <Text style={styles.label}>Marca</Text>
                  <Query query={MarcaLista}>
                  {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>Erro</Text>;
                    return (
                      <Picker
                        style={styles.picker}
                        selectedValue={this.state.marca}
                        onValueChange={(marca) => this.setState({marca})}>
                        { Array.isArray(data.__type.enumValues) && data.__type.enumValues.map((itemLista,j) => {
                          return(
                            <Picker.Item
                              label={itemLista.name}
                              value={itemLista.name}
                              key={itemLista.name}
                            />
                          )
                        })}
                      </Picker>
                    )
                  }}
                  </Query>

                  <Text style={styles.label}>Modelo</Text>
                  <TextInput style={styles.input} defaultValue={`${data.veiculo.modelo}`} onChangeText={(modelo) => this.setState({modelo})}/>
                  <Text style={styles.label}>Ano / Fabricação</Text>
                  <TextInput style={styles.input} defaultValue={`${data.veiculo.ano_fabricacao}`} onChangeText={(ano_fabricacao) => this.setState({ano_fabricacao})}/>
                  <Text style={styles.label}>Ano / Modelo</Text>
                  <TextInput style={styles.input} defaultValue={`${data.veiculo.ano_modelo}`} onChangeText={(ano_modelo) => this.setState({ano_modelo})}/>
                  <Text style={styles.label}>Tipo Combustível</Text>
                  <Query query={CombustivelLista}>
                  {({ loading, error, data }) => {
                    if (loading) return <Text>Loading...</Text>;
                    if (error) return <Text>Erro</Text>;
                    return (
                      <Picker
                        style={styles.picker}
                        selectedValue={this.state.combustivel}
                        onValueChange={(combustivel) => this.setState({combustivel})}>
                        { Array.isArray(data.__type.enumValues) && data.__type.enumValues.map((itemLista,j) => {
                          return(
                            <Picker.Item
                              label={itemLista.name}
                              value={itemLista.name}
                              key={itemLista.name}
                            />
                          )
                        })}
                      </Picker>
                    )
                  }}
                  </Query>
                  <Text style={styles.label}>Cor</Text>
                  <TextInput style={styles.input} defaultValue={`${data.veiculo.cor}`} onChangeText={(cor) => this.setState({cor})}/>
                  <Text style={styles.label}>Usado</Text>
                  <CheckBox defaultValue={`${data.veiculo.usado}`} onValueChange={(usado) => this.setState({usado})} />

                  <Mutation
                    mutation={editarVeiculo}
                    refetchQueries={() => {
                      return [{
                        query: detalhesVeiculo,
                        variables: { id: this.state.id }
                      }];
                    }}
                  >
                  {(updateVeiculo) => (
                    <TouchableOpacity style={styles.button} onPress={() => {
                      console.log(JSON.stringify(this.state));
                      updateVeiculo({
                        variables:{
                          data:{
                            marca: this.state.marca,
                            modelo: this.state.modelo,
                            ano_fabricacao: this.state.ano_fabricacao,
                            ano_modelo: this.state.ano_modelo,
                            combustivel: this.state.combustivel,
                            cor: this.state.cor,
                            usado: this.state.usado,
                          },
                          id:this.state.id
                        }
                      })
                      this.props.navigation.dispatch(NavigationActions.back())
                    }}>
                      <Text style={styles.buttonText}>Salvar edição</Text>
                    </TouchableOpacity>
                  )}
                  </Mutation>

                  <Mutation mutation={apagarVeiculo}>
                  {(deleteVeiculo) => (
                    <TouchableOpacity style={[styles.button,{backgroundColor:'#333333'}]} onPress={() => {
                      deleteVeiculo({
                        variables:{
                          id:this.state.id
                        }
                      })
                      this.props.navigation.dispatch(resetAction);
                    }}>
                      <Text style={styles.buttonText}>Apagar veiculo</Text>
                    </TouchableOpacity>
                  )}
                  </Mutation>

                </View>
              );
            }}
          </Query>
        }
        {this.state.id == 0 && //Adicionar
          <View>
            <Text style={styles.label}>Marca</Text>
            <Query query={MarcaLista}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>Erro</Text>;
              return (
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.marca}
                  onValueChange={(marca) => this.setState({marca})}>
                  { Array.isArray(data.__type.enumValues) && data.__type.enumValues.map((itemLista,j) => {
                    return(
                      <Picker.Item
                        label={itemLista.name}
                        value={itemLista.name}
                        key={itemLista.name}
                      />
                    )
                  })}
                </Picker>
              )
            }}
            </Query>
            <Text style={styles.label}>Modelo</Text>
            <TextInput style={styles.input} onChangeText={(modelo) => this.setState({modelo})}/>
            <Text style={styles.label}>Ano / Fabricação</Text>
            <TextInput style={styles.input} onChangeText={(ano_fabricacao) => this.setState({ano_fabricacao})}/>
            <Text style={styles.label}>Ano / Modelo</Text>
            <TextInput style={styles.input} onChangeText={(ano_modelo) => this.setState({ano_modelo})}/>
            <Text style={styles.label}>Tipo Combustível</Text>
            <Query query={CombustivelLista}>
            {({ loading, error, data }) => {
              if (loading) return <Text>Loading...</Text>;
              if (error) return <Text>Erro</Text>;
              return (
                <Picker
                  style={styles.picker}
                  selectedValue={this.state.combustivel}
                  onValueChange={(combustivel) => this.setState({combustivel})}>
                  { Array.isArray(data.__type.enumValues) && data.__type.enumValues.map((itemLista,j) => {
                    return(
                      <Picker.Item
                        label={itemLista.name}
                        value={itemLista.name}
                        key={itemLista.name}
                      />
                    )
                  })}
                </Picker>
              )
            }}
            </Query>
            <Text style={styles.label}>Cor</Text>
            <TextInput style={styles.input} onChangeText={(cor) => this.setState({cor})}/>
            <Text style={styles.label}>Usado</Text>
            <CheckBox onValueChange={(usado) => this.setState({usado})} />

            <Mutation mutation={criarVeiculo}>
            {(createVeiculo) => (
              <TouchableOpacity style={styles.button} onPress={() => {
                console.log(JSON.stringify(this.state));
                createVeiculo({
                  variables:{
                    data:{
                      marca: this.state.marca,
                      modelo: this.state.modelo,
                      ano_fabricacao: this.state.ano_fabricacao,
                      ano_modelo: this.state.ano_modelo,
                      combustivel: this.state.combustivel,
                      cor: this.state.cor,
                      usado: this.state.usado,
                    },
                  }
                })
                this.props.navigation.dispatch(resetAction);
              }}>
                <Text style={styles.buttonText}>Criar veiculo</Text>
              </TouchableOpacity>
            )}
            </Mutation>

          </View>
        }
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
  input:{
    color: '#333333',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    fontSize: 18,
    marginBottom: 5,
  },
  picker:{
    color: '#333333',
    padding: 5,
    borderRadius: 5,
    backgroundColor: '#ffffff',
    marginBottom: 5,
  },
  button: {
    padding: 6,
    margin: 8,
    marginTop:20,
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#009c9b',
    borderRadius:10,
  },
    buttonText: {
      margin: 'auto',
      padding: 8,
      color: 'white',
      textAlign: 'center',
      fontSize: 18,
    },
});
