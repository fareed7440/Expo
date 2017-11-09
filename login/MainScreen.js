import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';

class MainScreen extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'MainScreen',
	});

	signInWithGoogleAsync = async () => {
		try {
	  	const result = await Expo.Google.logInAsync({
				androidClientId: '267647481626-91lgpefg0gvset91squbiss3pnpsa05s.apps.googleusercontent.com',//process.env.GOOGLE_ANDROID_CLIENT_ID,
	      iosClientId: '267647481626-91lgpefg0gvset91squbiss3pnpsa05s.apps.googleusercontent.com',//process.env.GOOGLE_IOS_CLIENT_ID,
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

	signInWithFacebookAsync = async () => {
		Alert.alert("test", "Result: ");
		/*const { type, token } = await Expo.Facebook.logInWithReadPermissionsAsync('12345678', {
      permissions: ['public_profile'],
    }); // 12345678 es donde debe ir el APPID

  	if (type === 'success') {
    	// Get the user's name using Facebook's Graph API
    	const response = await fetch('https://graph.facebook.com/me?access_token=${token}');
    	Alert.alert(
      	'Logged in!',
      	'Hi ${(await response.json()).name}!',
    	);
  	}*/
	}

	onGoogleLoginPress = async () => {
		const result = await this.signInWithGoogleAsync()

		Alert.alert('RESULT', JSON.stringify(result))
		// if there is no result.error or result.cancelled, the user is logged in
		// do something with the result
	}

	onFacebookLoginPress = async () => {
		//const result = await this.signInWithFacebookAsync()

		Alert.alert('RESULT FACE', JSON.stringify(result))
		// if there is no result.error or result.cancelled, the user is logged in
		// do something with the result
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
						onPress={() => { this.onFacebookLoginPress }}>
					<Image style={ styles.loginImage } source={require('./images/facebook_logo.png')} />
				</TouchableOpacity>
			</View>
	);}
}

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
