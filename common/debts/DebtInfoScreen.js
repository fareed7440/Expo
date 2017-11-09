import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, AsyncStorage,
	FlatList,TouchableOpacity} from 'react-native';
import Api from './../api/Api';
import baseStyle from '../styles/baseStyle';
import I18n from "../api/I18n";
import { Ionicons } from '@expo/vector-icons';

class DebtInfoScreen extends Component {
		static navigationOptions = ({ navigation }) => ({
	    title:I18n.t("title_debts"),
	  });

		constructor(props){
      super(props);
      this.state = {
				appIsReady: false,
        debt: null,
        userDebts: null,
  		};
      this.loadUserDebts()
    }

    loadUserDebts = () => {
      Api.getUsersDebt(this.props.navigation.state.params.debt.debt_id).then((res) => {
        this.setState({
          appIsReady: true,
          debt: this.props.navigation.state.params.debt,
          userDebts: res.response.data,
        })
      })
    }

    showLoading() {
			 return(
				 <View style={styles.container}>
					 <Text>{I18n.t("text_loading")+"..."}</Text>
				 </View>
			 );
		}

    showUserDebts() {
      return(
        <View style={ styles.container }>
          <View style={ styles.debtInfo }>
            <Text style={ baseStyle.label }>Name</Text>
            <Text>{ this.state.debt.name }</Text>
            <Text style={ baseStyle.label }>Concept</Text>
            <Text>{ this.state.debt.concept }</Text>
          </View>
          <FlatList
  					style={ styles.listDebts }
  					data={ this.state.userDebts }
  					keyExtractor={ (item, index) => index }
  					renderItem={ ({item}) => this.renderFlatListItem(item) } />
        </View>
      );
    }

    renderFlatListItem(item) {
	     console.log(JSON.stringify(item));
       return (
 			     <TouchableOpacity style={ styles.item }>
              <View style={ styles.textContainer }>
    					     <Text style={ styles.textDebtName }>{ item.users.name } te debe</Text>
              </View>
              { this.renderDebtAmount(item.value) }
    		 		</TouchableOpacity>
    	 )
    }

    renderDebtAmount(amount) {
			if (amount > 0) {
				return (<Text style={ styles.debtItemTextGreen }>{ amount }€</Text>)
			} else {
				return (<Text style={ styles.debtItemTextRed }>{ amount }€</Text>)
			}
		}

		render(){
			if(this.state && this.state.userDebts != null && this.state.appIsReady) {
				return(this.showUserDebts());
			} else {
        return(this.showLoading());
			}
		}
}

const styles = StyleSheet.create({
		container: {
			justifyContent: 'center',
			backgroundColor: 'white'
		},
    debtInfo: {
      marginLeft: 16,
      marginTop: 16,
    },
    listDebts: {
      marginTop: 20
    },
    item: {
			flex:1,
      padding: 16,
			justifyContent: 'space-between',
			alignItems: 'center',
			flexDirection: 'row',
			backgroundColor:"white",
      height: 65,
			margin:3,
			borderColor:"#0070C0",
			borderStyle:"solid",
			borderWidth:2
    },
    debtItemTextGreen: {
			marginLeft: 16,
			marginRight: 16,
			flex: 0.15,
			fontSize: 16,
			fontWeight: "bold",
			textAlign: "right",
			color: "green",
		},
		debtItemTextRed: {
			marginLeft: 16,
			marginRight: 16,
			flex: 0.15,
			fontSize: 16,
			fontWeight: "bold",
			textAlign: "right",
			color: "red",
		}
});

export default DebtInfoScreen;
