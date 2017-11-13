import React, { Component } from 'react';
import {
  Text, TouchableOpacity, TextInput, View, StyleSheet, Alert,
  AsyncStorage, ToastAndroid, Picker, Item, Modal, TouchableHighlight, ScrollView
} from 'react-native';
import * as NB from 'native-base'
import I18n from "../api/I18n";
import baseStyle from "./../styles/baseStyle";
import Autocomplete from 'react-native-autocomplete-input';
import Api from './../api/Api';
import { NavigationActions } from 'react-navigation';
import DatePicker from 'react-native-datepicker'
import { Confirm } from './confirm'

const fruits = ['Apples', 'Oranges', 'Pears']
class AddDebt extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: 'Add Debt',
  });

  constructor(props) {
    super(props);
    this.state = {
      Name: '',
      concept: '',
      initDate: new Date(),
      expDate: new Date(),
      totalValue: '',
      AllContacts: [],
      Debts: [],
      contact: '',
      selectedItems: [],
      modalVisible: false,
      checked: false,
      checkedContact: [],
      DebtContact: [],
      selectContact: [],
      showModal: false

    }
    this.onSaveButton = this.onSaveButton.bind(this);


  }

  componentDidMount() {
    Api.getUsers('user').then((res) => {
      console.log('conn', res.response.data)
      this.setState({ AllContacts: res.response.data })

    }).catch((error) => {
      console.error(error);
    })
    for (var i = 0; i < this.state.AllContacts.length; i++) {
      this.setState({
        ['selectedContact' + i]: false
      })
    }
  }
  setModalVisible(visible) {
    this.setState({ modalVisible: visible });
  }

  onAccept = () => {

     var con = this.state.DebtContact;

      console.log('connnn', con)
      Api.addDebts(con).then((res) => {
        AsyncStorage.setItem('Debts', JSON.stringify(res));

      }).catch((err) => {
        alert(err)
      })
      this.AddUserDebts()
      this.setState({showModal:false, Name: '', concept: '', initDate: '', expDate: '', totalValue: ''})

  }

  onReject = () => {
    this.setState({
      showModal: false
    })
  }

  onSaveButton() {
    if (!this.state.Name || !this.state.concept || !this.state.initDate || !this.state.expDate || !this.state.totalValue) {
      ToastAndroid.show(
        'please insert filed', ToastAndroid.SHORT
      )
    } else {
      var obj = {
        name: this.state.Name,
        concept: this.state.concept,
        initDate: this.state.initDate,
        expDate: this.state.expDate,
        totalValue: this.state.totalValue,
        contact: this.state.contact,

      }
      console.log(obj)
     
      this.setState({
        showModal:true,
       
      })

    }
  }
  AddUserDebts = () => {
    let debtContacts = this.state.selectContact;
    console.log('func contact', debtContacts);
    Api.addUserDebts(debtContacts).then((res) => {
      AsyncStorage.setItem('AddUsersDebts', JSON.stringify(res));
      this.props.navigation.dispatch(resetMenuAction)

    }).catch((err) => {
      alert(err)
    })

  }

  render() {
    const { selectedItems } = this.state
    return (
      <NB.Container style={styles.container}>
        <NB.Content>
          <Modal
            animationType="slide"
            transparent={true}
            visible={this.state.modalVisible}
            onRequestClose={() => { }}>
            <View style={{
              flex: 1,
              flexDirection: 'column',
              alignItems: 'center',
              marginTop: '14%',
            }}>
              <View style={{ height: '85%', width: '98%', opacity: 0.9 }}>
                <ScrollView>

                  <NB.List>
                    {
                      this.state.AllContacts.map((item, ind) => (
                        <NB.ListItem key={ind}>
                          <NB.CheckBox checked={this.state['selectedContact' + ind]} onPress={() => {
                            var selectedContact = this.state.checkedContact
                            this.setState({
                              ['selectedContact' + ind]: !this.state['selectedContact' + ind]
                            }, () => {
                              if (this.state['selectedContact' + ind] === true) {
                                selectedContact.push(item)
                              }
                              else if (this.state['selectedContact' + ind] === false) {
                                selectedContact.splice(selectedContact.indexOf(item), 1)
                              }
                              this.setState({
                                checkedContact: selectedContact
                              })
                              console.log(this.state.checkedContact)
                            })
                          }} />
                          <NB.Body>
                            <Text>{'  '}{item.name}</Text>
                          </NB.Body>
                        </NB.ListItem>
                      ))
                    }
                  </NB.List>

                </ScrollView>
              </View>
              <View>
                <TouchableHighlight style={styles.loginBtnWrap} onPress={() => {
                  for (var j = 0; j < this.state.checkedContact.length; j++) {
                    this.state.AllContacts.splice(this.state.AllContacts.indexOf(this.state.checkedContact[j]), 1)
                    console.log('selected con', this.state.checkedContact[j])
                    this.state.selectContact.push(this.state.checkedContact[j])
                    this.state.checkedContact[j].value = this.state.totalValue / this.state.checkedContact.length
                    this.state.checkedContact[j].init_date = this.state.initDate
                    this.state.checkedContact[j].expiration_date = this.state.expDate
                    this.state.checkedContact[j].Name = this.state.Name
                    this.state.checkedContact[j].concept = this.state.concept

                    var con = {
                      concept: this.state.checkedContact[j].concept, Name: this.state.Name, init_date: this.state.checkedContact[j].init_date,
                      expiration_date: this.state.checkedContact[j].expiration_date, value: this.state.checkedContact[j].value, users: {
                        name: this.state.checkedContact[j].name, created_at: this.state.checkedContact[j].created_at,
                        email: this.state.checkedContact[j].email, id: this.state.checkedContact[j].id, name: this.state.checkedContact[j].name, exponent_token: this.state.checkedContact[j].exponent_token, num_document: this.state.checkedContact[j].num_document,
                        password: this.state.checkedContact[j].password, surnames: this.state.checkedContact[j].surnames, telephone: this.state.checkedContact[j].telephone, updated_at: this.state.checkedContact[j].updated_at
                      }
                    }
                    console.log('16333', con)
                    this.state.DebtContact.push(con)
                    //    console.log(this.state.DebtContact)
                  }
                  //  obj.users=this.state.DebtContact
                  //  console.log(obj,'hey')
                  console.log('debtcontact', this.state.DebtContact)
                  {/* var con = {concept: this.state.concept,name :this.state.name,init_date :this.state.DebtContact.init_date,
         expiration_date : this.state.DebtContact.expiration_date,value :this.state.DebtContact.value  , users:{ name: this.state.checkedContact.name,created_at : this.state.DebtContact.created_at,
        email :this.state.DebtContact.email,id : this.state.DebtContact.id, name :this.state.checkedContact.name,exponent_token :this.state.checkedContact.exponent_token , num_document: this.state.DebtContact.num_document,
      password  :this.state.DebtContact.password ,  surnames : this.state.DebtContact.surnames,telephone : this.state.DebtContact.telephone ,updated_at : this.state.DebtContact.updated_at   }}      
      console.log('contact', con) */}
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Text style={styles.loginBtnContent}>Enter</Text>
                </TouchableHighlight>
              </View>
            </View>
          </Modal>

          <Text style={styles.label}>name</Text>
          <TextInput style={styles.input}
            placeholder='name'
            value={this.state.Name}
            onChangeText={(value) => this.setState({ Name: value })}

          />
          <Text style={styles.label}>Concept</Text>
          <TextInput
            style={styles.input}
            placeholder='concept'
            value={this.state.concept}
            onChangeText={(value) => this.setState({ concept: value })}
          />
          <Text style={styles.label}>Initial Date</Text>
          <DatePicker
            style={{ width: 300, marginTop: 15 }}
            date={this.state.initDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={new Date()}
            // maxDate={new Date()}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
              // ... You can check the source to find the other keys. 
            }}
            onDateChange={(value) => { this.setState({ initDate: value }) }}
          />
        

          <Text style={styles.label}>Expiry Date</Text>
          <DatePicker
            style={{ width: 300, marginTop: 15 }}
            date={this.state.expDate}
            mode="date"
            placeholder="select date"
            format="YYYY-MM-DD"
            minDate={new Date()}
            // maxDate="2016-06-01"
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              dateIcon: {
                position: 'absolute',
                left: 0,
                top: 4,
                marginLeft: 0
              },
              dateInput: {
                marginLeft: 36
              }
            }}
            onDateChange={(value) => { this.setState({ expDate: value }) }}
          />

          <Text style={styles.label}>Total Value</Text>
          <TextInput
            style={styles.input}
            placeholder='Total Value'
            value={this.state.totalValue}

            onChangeText={(value) => this.setState({ totalValue: value })} />
          <TouchableHighlight
            style={styles.loginBtnWrap}
            onPress={() => {
              this.setModalVisible(true)
            }}>
            <Text style={styles.loginBtnContent}>select contact</Text>
          </TouchableHighlight>

          <TouchableOpacity style={styles.loginBtnWrap}
            onPress={this.onSaveButton}>
            <Text style={styles.loginBtnContent}>Enter</Text>
          </TouchableOpacity>
            <Confirm
            visible={this.state.showModal}
            onAccept={this.onAccept}
            onReject={this.onReject}
          >
            <Text>Are You Sure To Add This Debt ? </Text>
          </Confirm>
        </NB.Content>
      </NB.Container>
    )
  }
}

export default AddDebt

const resetMenuAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({ routeName: 'MainMenu' })
  ]
})
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',


  },
  label: {
    color: '#0070C0',
    fontWeight: 'bold',
    width: 300,

    // marginTop: 10
    textAlign: 'left'
  },
  input: {
    width: 300,
    textAlign: 'left',
    marginTop: 15

  },
  loginBtnWrap: {
    width: 300,
    margin: 30,
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










