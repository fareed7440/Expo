import React, { Component } from 'react';
import {
	View, Text, Image, Button, StyleSheet, Alert, AsyncStorage,
	FlatList, TouchableOpacity
} from 'react-native';
import Api from './../api/Api';
import baseStyle from '../styles/baseStyle';
import I18n from "../api/I18n";
import { Ionicons } from '@expo/vector-icons';

class DebtsScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: I18n.t("title_debts"),
	});

	getInitialState() {
		return { debts: [] }
	}

	constructor(props) {
		super(props);
		this.state = {
			appIsReady: false
		};
		this.loadDebts();
	}

	loadDebts = () => {
		AsyncStorage.getItem('login').then((value) => {
			let userLogin = JSON.parse(value);
			console.log("user" + userLogin.id);

			Api.getDebtsByUser(userLogin.id).then((res) => {
				console.log("DEBTS" + JSON.stringify(res.response))
				this.setState({
					appIsReady: true,
					debts: res.response.data
				})
				console.log('state debts',this.state.debts)
			})
		}).catch((error) => {
			console.error(error);
		});
	}

	renderFlatListItem(item) {
		console.log(JSON.stringify(item));
		return (
			<TouchableOpacity
				style={styles.item}
				onPress={() => {
					if (item.value > 0) {
						this.props.navigation.navigate('DebtInfoScreen', { debt: item })
					} else {
						this.props.navigation.navigate('CreditorDebtScreen', { debt: item })
					}
				}}>
				<View style={styles.textContainer}>
					<Text style={styles.textDebtName}>{item.name}</Text>
					<Text style={styles.textDebtConcept}>{item.concept}</Text>
				</View>
				<TouchableOpacity
					onPress={() => { Alert.alert('test', JSON.stringify(item)) }}>
					<Ionicons style={styles.chatItemBtn} name="ios-send" size={28} color="#0070C0" />
				</TouchableOpacity>
				{this.renderDebtAmount(item.value)}
			</TouchableOpacity>
		)
	}

	renderDebtAmount(amount) {
		if (amount > 0) {
			return (<Text style={styles.debtItemTextGreen}>{amount}€</Text>)
		} else {
			return (<Text style={styles.debtItemTextRed}>{amount}€</Text>)
		}
	}

	async componentWillMount() {
		await I18n.initAsync();
	}

	render() {
		if (this.state && this.state.debts != null && this.state.appIsReady) {
			return (this.showDebts());
		} else {
			return (this.showLoading());
		}
	}

	showLoading() {
		return (
			<View style={styles.container}>
				<Text>{I18n.t("text_loading") + "..."}</Text>
			</View>
		);
	}

	showDebts() {
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.listDebts}
					data={this.state.debts}
					keyExtractor={(item, index) => index}
					renderItem={({ item }) => this.renderFlatListItem(item)} />
				<TouchableOpacity style={[styles.btnNew]}
					onPress={() => this.props.navigation.navigate('AddDebt')}>
					<Text style={styles.loginBtnContent}>New Debt</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		backgroundColor: 'white'
	},
	listDebts: {
		flex: 1
	},
	item: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		backgroundColor: "white",
		height: 65,
		margin: 3,
		borderColor: "#0070C0",
		borderStyle: "solid",
		borderWidth: 2
	},
	textContainer: {
		flex: 1,
		marginLeft: 16,
	},
	textDebtName: {
		fontSize: 18,
		fontWeight: "bold",
		color: "black",
	},
	textDebtConcept: {
		fontSize: 15,
		color: "black"
	},
	chatItemBtn: {
		paddingLeft: 10,
		paddingRight: 10,
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
	sendMessageBtn: {
		marginRight: 16,
	}, loginBtnContent: {
		fontWeight: 'bold',
		color: 'white',
		margin: 5
	},
	debtItemTextRed: {
		marginLeft: 16,
		marginRight: 16,
		flex: 0.15,
		fontSize: 16,
		fontWeight: "bold",
		textAlign: "right",
		color: "red",
	},

	btnNew: {

		width: 300,
		alignSelf:'center',
	//margin: 30,
		backgroundColor: '#0070C0',
		alignItems: 'center',
		borderRadius: 2,
		marginBottom:20

	}
});

export default DebtsScreen;
