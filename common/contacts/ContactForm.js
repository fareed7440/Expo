import React, { Component } from 'react';
import { Text, TouchableOpacity, TextInput, View, StyleSheet,Alert,
  AsyncStorage} from 'react-native';
import baseStyle from "./../styles/baseStyle";
import Autocomplete from 'react-native-autocomplete-input';
import Api from './../api/Api';
import { NavigationActions } from 'react-navigation';
import I18n from "../api/I18n";
import {AppLoading } from 'expo';

class ContactForm extends Component {
  contacts;
  static navigationOptions = ({ navigation }) => ({
    title:I18n.t("title_add_contact")
  });

  constructor(props) {
    super(props);
    this.state = { results:[], query:"", textInput:"", appIsReady:false};
    this.contacts = this.props.navigation.state.params.contacts;
  }

  addContact = (userId,contactId) => {
    Api.addContact(userId, contactId).then((res) => {
      if(res.result.toUpperCase() == "OK") {
        this.props.navigation.state.params.updateContacts();
        this.props.navigation.dispatch(backAction)
      } else {
        Alert.alert(I18n.t("text_error_add_contact"));
      }
    });
  }

  onAccept = () => {
    Api.checkExistUser(this.state.query).then((res) => {
      if(res.result.toUpperCase() == "OK") {
        if(res.response.total > 0) {
            AsyncStorage.getItem('login').then((value) => {
              let user = res.response.data[0];
              let userLogin = JSON.parse(value);
              this.addContact(userLogin.id, user.id);
      		}).catch((error) => {
      			console.error(error);
      		});
        } else {
          Alert.alert(I18n.t("text_error_check_user"));
        }
      } else {
        Alert.alert(I18n.t("text_error"));
      }
    });
  }

  onTyping = (string) => {
    Api.findUsersByEmailOrPhone(string).then((res) => {
      users = res.response.data;
      usersFilter = new Array();
      existe = false;
      for(i = 0; i < users.length; i++) {
        for(z = 0; z < contacts.length; z++) {
          if(users[i].email == contacts[z].contact.email || users[i].email == contacts[z].user.email) {
            existe = true;
          }
        }
        if(!existe) {
          usersFilter.push(users[i]);
        }
        existe = false;
      }
      this.state.results = usersFilter;
    })
    this.setState({ query: string });
  }

  onSelect = (string) => {
    this.setState({ selection: string });
  }

  async componentWillMount(){
    await I18n.initAsync();
    this.setState({ appIsReady: true });
  }

  render() {
    if(!this.state.appIsReady) {
      return(
        <AppLoading />
      );
    } else {
      return (
        <View style={ [baseStyle.container, styles.divContent] }>
          <Text style={ [baseStyle.label,styles.txtTitle] }>{ I18n.t("text_search") }</Text>
          <Autocomplete
            autoCapitalize="none"
            style={ baseStyle.input }
            autoCorrect={ false }
            data={ this.state.results }
            defaultValue={ this.state.textInput }
            onChangeText={ text => this.onTyping(text) }
            placeholder={ I18n.t("text_holder_add_contact") }
            renderItem={ ( {id, name, surnames, email, telephone} ) => (
              <TouchableOpacity onPress={
                () => { this.setState({query: email, textInput: name+" "+surnames}) }
              }>
                <Text>{name} {surnames}</Text>
              </TouchableOpacity>
            )}
            />
          <TouchableOpacity style={ baseStyle.btnWrap }
                sonPress={ this.onAccept }>
            <Text style={ baseStyle.btnContent }>{I18n.t("btn_add")}</Text>
          </TouchableOpacity>
        </View>
      );
    }

  }
}

const styles = StyleSheet.create({
  txtTitle: {
    margin: 10
  }
});

const backAction = NavigationActions.back({
  action: NavigationActions.navigate({ routeName: 'Contacts'})
})

export default ContactForm
