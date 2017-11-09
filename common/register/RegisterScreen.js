import React, { Component } from 'react';
import { ScrollView, Text, Alert, TouchableOpacity, TextInput, View, StyleSheet} from 'react-native';
import Api from 'Owe/common/api/Api';
import { NavigationActions } from 'react-navigation';
import {AppLoading } from 'expo';
import I18n from "../api/I18n";

class RegisterScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:I18n.t("title_register"),
  });
  state = {
    name: '',
    surname: '',
    email: '',
    password: '',
    inputComponents: {},
    appIsReady:false
  }

  onRegisterUser = () => {
    let state = this.state
    let response = Api.registerByMail(state.name, state.surname, state.email, state.password).then((res) => {
      if (res.result.toUpperCase() == 'OK') {
        this.props.navigation.dispatch(resetMenuAction)
      } else {
        Alert.alert(I18n.t("text_error"), response.response)
      }
    })
	}

  onFocusNextField = (ref) => {
    if (ref.toUpperCase() != 'SUBMIT') {
      this.state.inputComponents[ref].focus()
    } else {
      this.onRegisterUser()
    }
  }

  async componentWillMount(){
    await I18n.initAsync();
    this.setState({appIsReady:true});
  }

  render() {
    if(!this.state.appIsReady){
      return(
        <AppLoading />
      );
    }else{
    return (
      <View style={ styles.container }>
        <ScrollView contentContainerStyle={ styles.scrollView }>
            <Text style={ styles.label }>{I18n.t("text_name")}</Text>
            <TextInput
              ref={ input => {
                this.state.inputComponents['one'] = input;
              }}
              style={styles.input}
              placeholder='Bruno'
              returnKeyType={ 'next' }
              onSubmitEditing={ () => { this.onFocusNextField('two') }}
              onChangeText={ (name) => {this.state.name = name} }/>

            <Text style={ styles.label }>{I18n.t("text_surname")}</Text>
            <TextInput
              ref={ input => {
                this.state.inputComponents['two'] = input;
              }}
              style={styles.input}
              placeholder='Barlocco'
              returnKeyType={ 'next' }
              onSubmitEditing={ () => { this.onFocusNextField('three') }}
              onChangeText={ (surname) => {this.state.surname = surname} }/>

            <Text style={ styles.label }>Email</Text>
            <TextInput
              ref={ input => {
                this.state.inputComponents['three'] = input;
              }}
              style={styles.input}
              placeholder='mail@example.com'
              returnKeyType={ 'next' }
              onSubmitEditing={ () => { this.onFocusNextField('four') }}
              onChangeText={ (mail) => { this.state.email = mail }}/>

            <Text style={ styles.label }>Password</Text>
            <TextInput
              ref={ input => {
                this.state.inputComponents['four'] = input;
              }}
              style={ styles.input }
              secureTextEntry={ true }
              placeholder={ 'Password' }
              onSubmitEditing={ () => { this.onFocusNextField('submit') }}
              onChangeText={ (pass) => {this.state.password = pass} }/>

            <TouchableOpacity
              style={ styles.registerBtnWrap }
              onPress={ this.onRegisterUser }>
              <Text style={ styles.registerBtnContent }>{I18n.t("text_register")}</Text>
            </TouchableOpacity>
        </ScrollView>
        </View>
    );
  }
  }
}

const resetMenuAction = NavigationActions.reset({
	index: 0,
	actions: [
		NavigationActions.navigate({ routeName: 'MainMenu'})
	]
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  scrollView: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 30
  },
  label: {
    color: '#0070C0',
    fontWeight: 'bold',
    width: 300,
    textAlign: 'left'
  },
  input: {
    width: 300,
    textAlign: 'left',
    marginLeft: 15,
  },
  registerBtnWrap: {
    width: 300,
    margin:30,
    backgroundColor: '#0070C0',
    alignItems: 'center',
    borderRadius: 2
  },
  registerBtnContent: {
    fontWeight: 'bold',
    color: 'white',
    margin: 5
  }
});

export default RegisterScreen
