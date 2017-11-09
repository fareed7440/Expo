import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, AsyncStorage,
	FlatList,TouchableOpacity} from 'react-native';
import Api from './../api/Api';
import baseStyle from '../styles/baseStyle';
import I18n from "../api/I18n";
import { Ionicons } from '@expo/vector-icons';

class CreditorDebtScreen extends Component {
		static navigationOptions = ({ navigation }) => ({
	    title:I18n.t("title_debts"),
	  });

		constructor(props){
      super(props);
      this.state = {
				appIsReady: false,
        debt: this.props.navigation.state.params.debt,
        debtCreditor: null
  		};
      this.loadDebtCreditor()
    }

    showLoading() {
			 return(
				 <View style={styles.container}>
					 <Text>{I18n.t("text_loading")+"..."}</Text>
				 </View>
			 );
		}

    loadDebtCreditor = () => {
      Api.getDebtCreditor(this.state.debt.user_id, this.state.debt.debt_id).then((res) => {
        this.setState({
          appIsReady: true,
          debtCreditor: res.response.data[0]
        })
      })
    }

    showDebt() {
      return(
        <View style={ styles.container }>
          <View>
            <Text style={ styles.titleDebt }>Debes a { this.state.debt.users.name } { this.state.debt.users.surnames }: </Text>
          </View>
          <View>
            <Text style={ styles.debtAmount }>{ this.state.debtCreditor.value }€</Text>
          </View>
          <View style={ styles.infoContainer }>
            <View style={ styles.debtInfo }>
              <Text style={ baseStyle.label }>Name</Text>
              <Text>{ this.state.debt.name }</Text>
              <Text style={ baseStyle.label }>Concept</Text>
              <Text>{ this.state.debt.concept }</Text>
            </View>
            <View style={ styles.debtInfo }>
              <Text style={ baseStyle.label }>Creditor</Text>
              <Text>{ this.state.debt.users.name } { this.state.debt.users.surnames }</Text>
              <Text style={ baseStyle.label }>Email</Text>
              <Text>{ this.state.debt.users.email }</Text>
              <Text style={ baseStyle.label }>Phone</Text>
              <Text>{ this.state.debt.users.telephone }</Text>
            </View>
          </View>
        </View>
      );
    }

		render(){
			if(this.state && this.state.debtCreditor != null && this.state.appIsReady) {
				return(this.showDebt());
			} else {
        return(this.showLoading());
			}
		}
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      paddingTop: 15,
    },
    titleDebt: {
      fontSize: 25,
      fontWeight: 'bold',
    },
    debtAmount: {
      width: 180,
      height: 70,
      borderRadius: 150,
      backgroundColor: '#0070C0',
      fontSize: 50,
      fontWeight: 'bold',
      color: 'white',
      textAlign: 'center',
      alignItems: 'center',
      marginTop: 15,
      marginBottom: 30,
    },
    infoContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      backgroundColor: 'white'
    },
    debtInfo: {
      flex: 1,
      marginLeft: 16,
      marginTop: 16,
      marginRight: 16,
    }
});

export default CreditorDebtScreen;
