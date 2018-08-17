import Expo from 'expo';
import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, TouchableOpacity, Image, Alert } from 'react-native';

export default class Header extends React.Component {
  constructor ( props ){
    super ( props );

    if (this.props.noBack != undefined && this.props.noBack == true){
      this.state = {
        backButton:false
      };
    }else{
      this.state = {
        backButton: true
      };
    }
  }
  render() {
    return (
      <View style={styles.topBar}>
        <View style={styles.topBarLeft}>
        {
          this.state.backButton == true &&
            <TouchableOpacity style={styles.topBarIcon} onPress={() => this.props.onPressBack()}>
              <Image
                source={require('../img/icone_seta_esquerda.png')}
                style={styles.topBarIconImage}
                resizeMode="contain"
              />
            </TouchableOpacity>
        }
        </View>
        { this.props.children }
        <View style={styles.topBarRight}>

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
    height:50,
    width:50,
  },
    topBarIconImage:{
      height:40,
      width:40,
      margin:5,
    },
  topBarLeft: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  topBarRight: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
});
