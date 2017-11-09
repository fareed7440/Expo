import React, { Component } from 'react';
import { View, Text, Image, Button, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import Api from 'Owe/common/api/Api';
import Entypo from 'react-native-vector-icons/Entypo';

class MainMenu extends Component {
	static navigationOptions = ({ navigation }) => ({
		title: 'Owe',
		header: null
	});

	constructor(props) {
		super(props)
	}
 async componentWillMount() {
      await Expo.Font.loadAsync({
        'Roboto': require('native-base/Fonts/Roboto.ttf'),
        'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
        'Ionicons': require('native-base/Fonts/Ionicons.ttf'),
      });
  }
	render() {
		return(
			<View style={styles.container}>
				<TouchableOpacity
						style={styles.child}
						onPress={ () => { this.props.navigation.navigate('Contacts') }} >
						<Text>Contacts</Text>
				</TouchableOpacity>

				<TouchableOpacity
						style={styles.child}
						onPress={ () => { this.props.navigation.navigate('Statistics') }} >
						<Text>Statistics</Text>
				</TouchableOpacity>

				<TouchableOpacity
						style={styles.child}
						onPress={ () => { this.props.navigation.navigate('DebtsScreen') }} >
						<Text>Debts</Text>
				</TouchableOpacity>

				<TouchableOpacity
						style={styles.child}
						onPress={ () => { this.props.navigation.navigate('Settings') }} >
						<Text>Settings</Text>
						<Image
							style={{width: 50, height: 50}}
				 source={require('../../settings.png')}
			 />
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
	}
});

export default MainMenu;
