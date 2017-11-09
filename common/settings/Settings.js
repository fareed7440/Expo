import React, { Component } from 'react';
import { Text,View, TouchableOpacity, StyleSheet, AsyncStorage, Alert, Switch } from 'react-native';
import Api from '../api/Api';

export default class Settings extends Component {

  constructor(){
    super();
    this.state = {
      setting: {
        'user_id':0,
        'intelligence': false,
        'dataEnd': false
      }
    };
    this.updateSetting();
  }

  updateSetting = () => {
    // este es el usuario logeado actual/current
    AsyncStorage.getItem('login').then((value) => {
      let user = JSON.parse(value);
      let userIDLogin = user.id;
      this.state.setting.user_id=userIDLogin;
      // al usuario loegeado lo mando al filtro
      Api.getSettings(userIDLogin).then((res) => {
        if(res.result.toUpperCase() == "OK") {
          if (res.response.data.length >  0) {
            console.log('hola');
            this.setState({setting:res.response.data[0]});
            let user_idCurrent = this.state.setting.user_id
            let intelligence, dataEnd = false
          }
        }
      });
    });
  }

  lookUp = ()  => {

      Api.addSettings(this.state.setting).then((res) =>{

          if(this.state.setting.id==null){
              this.updateSetting();
          }

      });
  }

  loadIntelligenceCheckBox = () => {
    let checked = false
    if (this.state.setting.intelligence == 1) {
      checked = true
    }

    return (
      <Switch
        value={checked}
        onValueChange={() => {
          this.state.setting.intelligence = !this.state.setting.intelligence;
          this.setState(this.state);
          console.log('State intelligence '+JSON.stringify(this.state))
          this.lookUp();
        }}/>
    )
  }

  loadDataEndBox = () => {
    let checked = false
    if (this.state.setting.dataEnd == 1) {
      checked = true
    }

    return (
      <Switch
        value={checked}
        onValueChange={() => {
          this.state.setting.dataEnd = !this.state.setting.dataEnd;
          this.setState(this.state);
          console.log('State dataend '+JSON.stringify(this.state))
          this.lookUp();
        }}/>
    )
  }

  render() {
      return (

      <View style={styles.container}>
        <View style={ styles.row }>
            <View style={ styles.titles }>
              <Text style={styles.text}>Itelligence OWE </Text>
              <Text style={styles.subtitle}>Explicacion intelligence OWE</Text>
            </View>
            { this.loadIntelligenceCheckBox() }
            <TouchableOpacity onPress={
              () => Alert.alert(
                'Intelligence',
                ' enviará mensajes automáticos 5 días antes del vencimiento de cualquier deuda y posteriormente a su vencimiento') }>
              <Text style={styles.question}>?</Text>
            </TouchableOpacity>
        </View>
        <View style={ styles.row }>
            <View style={ styles.titles }>
              <Text style={styles.text}>Data End</Text>
              <Text style={styles.subtitle}>Explicacion DataEnd OWE</Text>
            </View>
            { this.loadDataEndBox() }
            <TouchableOpacity
              onPress={() => Alert.alert(
                'Data End',
                ' enviará mensajes automáticos 5 días antes del vencimiento de cualquier deuda y posteriormente a su vencimiento') }>
                <Text style={styles.question}>?</Text>
            </TouchableOpacity>
        </View>
      </View>
    ); {/* Fin del return */}
  }
}

// los estilos al final, iran al directorio estilos

const styles = StyleSheet.create({
  question: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    marginLeft: 15
  },
  titles: {
    flex: 1,
  },
  text : {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0070C0',
  },
  subtitle: {
    fontSize: 12,
    color: '#686868'
  },
  container:{
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: 'white',
    margin:2
  },
  row:{
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#afafaf',
    alignItems: 'center'
  }
});
