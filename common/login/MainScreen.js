import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Alert, StyleSheet,AsyncStorage } from 'react-native';
import MainMenu from '../mainmenu/MainMenu';
import { NavigationActions } from 'react-navigation';
import I18n from "../api/I18n";
import Expo from 'expo';

class MainScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: I18n.t("title_login_menu"),
		header:null
	});

	signInWithGoogleAsync = async () => {
		try {
	  	const result = await Expo.Google.logInAsync({
				androidClientId: '267647481626-91lgpefg0gvset91squbiss3pnpsa05s.apps.googleusercontent.com',
	      iosClientId: '267647481626-84gphl6nhgq4sgmcs8e0arcehhtoua8g.apps.googleusercontent.com',
	      scopes: ['profile'],
			})

			if (result.type === 'success') {
				return result
			}
			return { cancelled: true }
		} catch (e) {
			return { error: e }
		}
	}

	async signInWithFacebookAsync() {
		const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('1490905484290695', {
      permissions: ['public_profile'],
    });

  	if (type === 'success') {
    	// Get the user's name using Facebook's Graph API
    	const response = await fetch('https://graph.facebook.com/me?access_token=${token}');
    	Alert.alert(
      	'Logged in!',
      	'Hi ${(await response.json()).name}!',
    	);
  	} else {
			Alert.alert(
      	'Not Logged in!',
      	'Bye!',
    	);
		}
	}

	onGoogleLoginPress = async () => {
		const result = await this.signInWithGoogleAsync()

		Alert.alert('RESULT', JSON.stringify(result))
		// if there is no result.error or result.cancelled, the user is logged in
		// do something with the result
	}

	componentWillMount(){

		AsyncStorage.getItem('login').then((value)=>{
			if(value!=null)
			{
				  this.props.navigation.dispatch(resetMenuAction)
			}
		}).catch((error)=>{
			console.error(error);
		});
	}

	render() {
		return(
			<View style={styles.container}>
				<Button
					title={ 'Login' }
					onPress={ this.onGoogleLoginPress } />

				<TouchableOpacity
						style={ styles.child }
						onPress={() => this.props.navigation.navigate('LoginMail')}>
					<Image style={ styles.loginImage } source={require('./images/gmail_logo.png')} />
				</TouchableOpacity>

				<TouchableOpacity
						style={ styles.child }
						onPress={ this.signInWithFacebookAsync }>
					<Image style={ styles.loginImage } source={require('./images/facebook_logo.png')} />
				</TouchableOpacity>
			</View>
	);}
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
		backgroundColor: 'white'
	},
	child: {
		width: 120,
		height: 120,
		justifyContent: 'center',
		alignItems: 'center',
		margin: 20,
		backgroundColor: '#0070C0',
	},
	loginImage: {
		width: 60,
		height: 60
	},
  signin: {
    width: 230,
    height: 48
  },
});

export default MainScreen;
