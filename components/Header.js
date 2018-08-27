import Expo from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

export default class Header extends React.Component {
  constructor ( props ){
    super ( props );

    this.state = {
      backButton: this.props.backButton,
    };

  }
  render() {
    return (
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
        {this.state.backButton == true &&
            <TouchableOpacity style={styles.topBarIcon} onPress={() => this.props.onPressBack()}>
              <Image
                source={require('../img/icone_seta_esquerda.png')}
                style={styles.topBarIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
        }
        </View>
        {this.props.title != undefined &&
          <Text style={styles.topBarTitle}>
            {this.props.title}
          </Text>
        }
        <View style={styles.topBarRight}>
          {this.props.rightButton != 'none' &&
            <TouchableOpacity style={styles.topBarIcon} onPress={() => this.props.onPressRight()}>
              {this.props.rightButton == 'add' &&
                <Image
                  source={require('../img/icone_add.png')}
                  style={styles.topBarIconImage}
                  resizeMode="contain"
                />
              }
              {this.props.rightButton == 'edit' &&
                <Text style={styles.buttonText}>Editar</Text>
              }
          </TouchableOpacity>
          }
        </View>
      </View>
    )
  }
}


const styles = StyleSheet.create({
//barra de cima
topBar: {
  backgroundColor: '#666666',
  flexDirection: 'row',
  height:60 + Expo.Constants.statusBarHeight,
  padding:0,
  paddingTop: Expo.Constants.statusBarHeight,
  margin:0,
},

  topBarIcon: {
    height:60,
    width:60,
  },
    topBarIconImage:{
      height:40,
      width:40,
      margin:10,
    },
  topBarLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topBarTitle: {
    height:30,
    marginTop:18,
    margin:5,
    color:'#ffffff',
    fontSize: 20,
  },
  topBarRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  buttonText: {
    color:'#ffffff',
    fontSize: 14,
    margin:'auto',
    paddingTop:20,
    paddingBottom:20,
  },
});
