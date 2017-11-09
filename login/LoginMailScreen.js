import React, { Component } from 'react';
import { Text, Alert, TouchableOpacity, TextInput, View, StyleSheet} from 'react-native';
import Api from 'Owe/common/api/Api';
import { NavigationActions } from 'react-navigation';

class LoginMailScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title:"Login Mail"
  });
  state = {
    email: '',
    password: '',
    inputComponents: {}
  }

  onCheckMailLogin = () => {
    Api.loginByMail(this.state.email, this.state.password).then((res) => {
      if (res.result.toUpperCase() == 'OK') {
        this.props.navigation.dispatch(resetMenuAction)
      } else {
        let message = "Credenciales incorrectas"
        Alert.alert('Result', message)
      }
    })
	}

  onFocusNextField = (ref) => {
    if (ref.toUpperCase() != 'SUBMIT') {
      this.state.inputComponents[ref].focus()
    } else {
      this.onCheckMailLogin()
    }
  }

  render() {
    return (
      <View style={ styles.container }>

        <Text style={ styles.label }>Email</Text>
        <TextInput
          ref={ input => {
            this.state.inputComponents['one'] = input;
          }}
          style={styles.input}
          placeholder='mail@example.com'
          returnKeyType={ 'next' }
          onSubmitEditing={ () => { this.onFocusNextField('two') }}
          onChangeText={ (mail) => { this.state.email = mail } }/>

        <Text style={ styles.label }>Password</Text>
        <TextInput
          ref={ input => {
            this.state.inputComponents['two'] = input;
          }}
          style={ styles.input }
          secureTextEntry={ true }
          placeholder={ 'Password' }
          onSubmitEditing={ () => { this.onFocusNextField('submit') }}
          onChangeText={ (pass) => { this.state.password = pass } }/>

        <TouchableOpacity style={ styles.loginBtnWrap }
          onPress={ this.onCheckMailLogin }>
          <Text style={ styles.loginBtnContent }>Enter</Text>
        </TouchableOpacity>

        <Text style={ styles.registerLink }
          onPress={ () => this.props.navigation.navigate('Register')}>
          REGISTRARME
        </Text>
      </View>
    );
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  label: {
    color: '#0070C0',
    fontWeight: 'bold',
    width: 300,
    textAlign: 'left'
  },
  input: {
    width: 300,
    padding: 6,
    textAlign: 'left',
    marginLeft: 15,
  },
  loginBtnWrap: {
    width: 300,
    margin:30,
    backgroundColor: '#0070C0',
    alignItems: 'center',
    borderRadius: 2
  },
  loginBtnContent: {
    fontWeight: 'bold',
    color: 'white',
    margin: 5
  },
  registerLink: {
    fontWeight: 'bold',
    color: '#0070C0'
  }
});

export default LoginMailScreen
