import React, { Component } from 'react';
import { Text,View,StyleSheet,AsyncStorage} from 'react-native';
import Api from '../api/Api';

export default class Statisrics extends Component {
  constructor(){
    super();
    this.state = {
        current : null,
        charge: 0,
        pay: 0,
        defaults: 0,
        recovered: 0,
        perc_paid_on_time: 0,
        perc_unpaid_debts: 0,
        perc_not_paid_on_time: 0,
        balance: 0,
      }
  }

  componentDidMount() {
    // este es el usuario logeado actual/current
    AsyncStorage.getItem('login').then((value) => {
      let user = JSON.parse(value);
      let userIDLogin = user.id;
      this.setState({current : userIDLogin});
     // console.log(this.state.current);
    });
    Api.getStatistics().then((res) => {
      let userID = res.response.data;
      userID.map((id) => {
        if (id.id == this.state.current){
        this.setState({
           charge : id.charge ,
           pay : id.pay ,
           defaults : id.defaults ,
           recovered : id.recovered ,
           perc_paid_on_time : id.perc_paid_on_time,
           perc_unpaid_debts : id.perc_unpaid_debts,
           perc_not_paid_on_time : id.perc_not_paid_on_time,
           balance : id.balance
          })
        }})

    });

  }

  calcular = () => {
    if (this.state.charge > 0) {
      return (
      <View style={ styles.titles }>
        <Text style={styles.text1 }>€{this.state.charge} </Text>
        <Text style={styles.subtitle}>saldo Actual</Text>
      </View> );
    }
    else {
    return (
      <View style={ styles.titles }>
        <Text style={styles.text2 }>{this.state.charge} </Text>
        <Text style={styles.subtitle}>saldo Actual</Text>
      </View>);
    }

  }

  render() {
    return (
      <View style={styles.container}>

            {this.calcular()}

            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.pay} </Text>
              <Text style={styles.subtitle}>Pagar</Text>
            </View>
            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.defaults} </Text>
              <Text style={styles.subtitle}>Por Defecto</Text>
            </View>
            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.recovered} </Text>
              <Text style={styles.subtitle}>Dinero Recuperado</Text>
            </View>
            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.perc_paid_on_time} </Text>
              <Text style={styles.subtitle}>Dinero Pago a tiempo</Text>
            </View>
            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.perc_unpaid_debts} </Text>
              <Text style={styles.subtitle}>Deudas Impagas</Text>
            </View>
            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.perc_not_paid_on_time} </Text>
              <Text style={styles.subtitle}>Deudas no pagas a Tiempo</Text>
            </View>
            <View style={ styles.titles }>
              <Text style={styles.text }>€{this.state.balance} </Text>
              <Text style={styles.subtitle}>Balance</Text>
            </View>
        </View>
    );
  }

}


const styles = StyleSheet.create({
  subtitle: {
    flex:1,
    fontSize: 12,
    color: '#686868'
  },
  container:{
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    margin:2
  },

  text : {
    flex:1,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#0070C0',
    padding: 10

  },
  text1 : {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'green',
    padding: 10

  },
  text2 : {
    flex:1,
    fontSize: 20,
    fontWeight: 'bold',
    color: 'red',
    padding: 10

  },
  titles: {
    flex: 1,
    alignItems: 'center',
    padding: 5
  }
});
