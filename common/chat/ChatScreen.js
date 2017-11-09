import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, TextInput, TouchableOpacity,
  FlatList, Alert } from 'react-native';
import I18n from "../api/I18n";
import {AppLoading } from 'expo';
import Api from 'Owe/common/api/Api';


class ChatScreen extends Component{
  state = {
      appIsReady:false,
      user: null,
  }

  static navigationOptions = ({ navigation }) => {
    const { state: { params = {} } } = navigation;
    return {
      title: params.title || "Loading...",
    };
  }

  async componentWillMount() {
    await I18n.initAsync();
  }

  async componentDidMount() {
    Api.getUser(this.props.navigation.state.params.userID).then((res) => {
      this.setState({
        appIsReady:true,
        user: res.response,
      })
      this.props.navigation.setParams({ title: res.response.name })
    })
  }

  render(){
    if(!this.state.appIsReady) {
      return(
        <AppLoading />
      );
    } else {
      return(
        <View style={styles.divContent}>
            <View style={styles.divMensajes}>
              <FlatList style={styles.listMessage}/>
            </View>
            <View style={styles.divSend}>
              <TextInput
                underlineColorAndroid={'transparent'}
                style={styles.txtMensaje}
                placeholder={I18n.t("text_write_message")}/>
              <TouchableOpacity
  						  style={styles.btnEnviar}
  						  onPress={() => {}}>
                <Image
                  style={styles.imgSend}
                  source={require('./images/send_white.png')}/>
  				    </TouchableOpacity>
            </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
    divContent: {
      flex:1,
      backgroundColor:"#0070C0",
      flexDirection:"column",
      justifyContent: 'center'
    },
    divMensajes: {
      flex:5,
      margin:10,
      backgroundColor:"white"
    },
    divSend: {
      flex:1.4,
      marginLeft:10,
      marginRight:10,
      flexDirection:"row",
      backgroundColor:"transparent",
      alignItems: 'center',
      justifyContent: 'center'
    },
    txtMensaje: {
      flex:1,
      height:50,
      borderRadius:20,
      backgroundColor:"white",
      padding:5
    },
    btnEnviar: {
      width:50,
      height:50,
      backgroundColor:"white",
      borderRadius:50/2,
      marginLeft:10,
      alignItems: 'center',
      justifyContent: 'center',
    },
    imgSend: {
      width: 30,
      height: 30,
      tintColor:"#0070C0"
    },
    listMessage: {
      flex:1
    }
  });

export default ChatScreen;
