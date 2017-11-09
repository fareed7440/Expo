import React, { Component } from 'react';
import { Permissions, Notifications } from 'expo';
import { Platform, AsyncStorage } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Api from './common/api/Api';
import MainScreen from './common/login/MainScreen';
import LoginMailScreen from './common/login/LoginMailScreen';
import RegisterScreen from './common/register/RegisterScreen';
import MainMenu from './common/mainmenu/MainMenu';
import Settings from './common/settings/Settings';
import Statistics from './common/statistics/Statistics';
import Contacts from './common/contacts/Contacts';
import ContactForm from './common/contacts/ContactForm';
import ChatScreen from './common/chat/ChatScreen';
import GroupForm from './common/contacts/GroupForm';
import GroupFormNext from './common/contacts/GroupFormNext';
import DebtsScreen from './common/debts/DebtsScreen';
import DebtInfoScreen from './common/debts/DebtInfoScreen';
import CreditorDebtScreen from './common/debts/CreditorDebtScreen';
import AddDebt from './common/debts/addDebt'

const OweStack = StackNavigator({
    Home: {
      screen: MainScreen,
    },
		LoginMail: {
			screen: LoginMailScreen,
		},
    Register: {
      screen: RegisterScreen,
    },
    Contacts: {
			screen: Contacts,
		},
    ContactForm:{
      screen: ContactForm,
    },
    Settings:{
      screen: Settings,
    },
    Statistics:{
      screen: Statistics,
    },
    MainMenu: {
      screen: MainMenu,
    },
    Chat: {
      screen: ChatScreen,
    },
    GroupForm: {
      screen: GroupForm,
    },
    GroupFormNext:{
      screen:GroupFormNext,
    },
    DebtsScreen: {
      screen: DebtsScreen,
    },
    DebtInfoScreen: {
      screen: DebtInfoScreen,
    },
    CreditorDebtScreen: {
      screen: CreditorDebtScreen,
    },
    AddDebt : {
      screen : AddDebt
    }
  },
  {
    navigationOptions: { headerStyle: { marginTop: (Platform.OS === "ios" ? 0 : Expo.Constants.statusBarHeight) } }
  });

export default class Owe extends React.Component {

  componentWillMount() {
    this.registerForPushNotificationsAsync();

    // Handle notifications that are received or selected while the app
    // is open. If the app was closed and then opened by tapping the
    // notification (rather than just tapping the app icon to open it),
    // this function will fire on the next tick after the app starts
    // with the notification data.
    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
  }

  _handleNotification = (notification) => {
    this.setState({notification: notification});
  };

  async registerForPushNotificationsAsync() {
    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );
    let finalStatus = existingStatus;

    // only ask if permissions have not already been determined, because
    // iOS won't necessarily prompt the user a second time.
    if (existingStatus !== 'granted') {
      // Android remote notification permissions are granted during the app install, so this will only ask on iOS
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    // Stop here if the user did not grant permissions
    if (finalStatus !== 'granted') {
      return;
    }

    // Get the token that uniquely identifies this device
    let token = await Notifications.getExpoPushTokenAsync();
    console.log(JSON.stringify(token));

    // POST the token to your backend server from where you can retrieve it to send push notifications.
    AsyncStorage.getItem('login').then((value) => {
      let userLogin = JSON.parse(value);
      if (userLogin != null) {
        Api.postExponentToken(token, userLogin.id);
      }
    }).catch((error) => {
      console.error(error);
    });
  }

  render() {
    return (
        <OweStack />
    );
  }
}
