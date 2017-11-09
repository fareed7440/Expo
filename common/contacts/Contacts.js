import React, { Component } from 'react';
import { View, Text, Image, Button, StyleSheet, Alert, AsyncStorage,
	FlatList, TouchableOpacity} from 'react-native';
import Api from './../api/Api';
import baseStyle from '../styles/baseStyle';
import I18n from "../api/I18n";
import { Entypo } from '@expo/vector-icons';
import { Dialog,FontAwesome,MaterialIcons } from 'react-native-simple-dialogs';

class Contacts extends Component {

		contacts=[];
		groups=[];
		allData=[];

		static navigationOptions = ({ navigation }) => ({
	    title:I18n.t("title_contacts"),
			headerRight:<View>
	                      <TouchableOpacity style={styles.divBotonMenu} onPress={()=>navigation.state.params.onClickMenu()}>
	                          <Entypo name="plus" size={30} color="#0070C0" />
	                      </TouchableOpacity>
	                </View>
	  });

		getInitialState(){
      return {
				data:[]
			}
    }

		constructor(props){
      super(props);
      this.state = {
				appIsReady:false,
				dialogVisible:false
  		};

			this.updateData();
    }

		updateData=()=>{
			this.updateGroups();
		}

		updateContacts = () => {
			AsyncStorage.getItem('login').then((value) => {
				let userLogin = JSON.parse(value);
				Api.getContacts(userLogin.id).then((res) => {
					contacts = res.response.data;
					this.allData=this.allData.concat(contacts);
					this.setState({data:this.allData});
				});
			}).catch((error) => {
				console.error(error);
			});
		}

		updateGroups=()=>{
			AsyncStorage.getItem('login').then((value) => {
				let userLogin = JSON.parse(value);
				Api.getGroups(userLogin.id).then((res) => {
					groups = res.response.data;
					this.allData=this.allData.concat(groups);
					this.setState({data:this.allData});
					this.updateContacts();
				});
			}).catch((error) => {
				console.error(error);
			});
		}

		renderFlatListItem(item) {

			if("contact" in item)
			{
				return (
			 			<TouchableOpacity
			 					style={styles.item}
			 					onPress={() => { this.props.navigation.navigate('Chat', { userID: item.contact.id })}}>
								<Entypo style={styles.icon} name="user" size={20} color="#0070C0" />
			 				<Text style={styles.textItem}>{ item.contact.name }</Text>
			 			</TouchableOpacity>
				);
			}else
			{
				return (
						<TouchableOpacity
								style={styles.item}
								>
							<Entypo style={styles.icon} name="users" size={20} color="#0070C0" />
							<Text style={styles.textItem}>{ item.conversation.name}</Text>

						</TouchableOpacity>
				);
			}


		}

		onClickMenu=()=>{
			this.setState({dialogVisible:true});
		}

		onClickNewContact=()=>{
			this.setState({dialogVisible:false});
			this.props.navigation.navigate("ContactForm", { contacts:this.state.contacts, updateContacts:this.updateData });
		}

		onClickNewGrupo=()=>{
			this.setState({dialogVisible:false});
			this.props.navigation.navigate("GroupForm", { updateContacts:this.updateData });
		}

		async componentWillMount(){
	     await I18n.initAsync();
	     this.setState({appIsReady:true});
		}

		render(){
			if(this.state && this.state.data != null && this.state.appIsReady) {
				return(this.showContacts());
			} else {
				return(this.showLoading());
			}
		}

		componentDidMount () {
	      this.props.navigation.setParams({onClickMenu: this.onClickMenu})
	    }

		showLoading(){
			 return(
				 <View style={styles.container}>
					 <Text>{I18n.t("text_loading")+"..."}</Text>
				 </View>
			 );
		 }

		showContacts(){
      return(
        <View style={styles.container}>
				<Dialog
    			visible={this.state.dialogVisible}
    			onTouchOutside={() => this.setState({dialogVisible: false})} >
    			<View>
        		<TouchableOpacity
							style={styles.buttonDialog}
							onPress={this.onClickNewContact} >
							<Text style={styles.textDialog}>{ I18n.t("btn_new_contact") }</Text>
						</TouchableOpacity>
						<TouchableOpacity
							style={styles.buttonDialog}
							onPress={this.onClickNewGrupo} >
							<Text style={styles.textDialog}>{ I18n.t("btn_new_group") }</Text>
						</TouchableOpacity>
    			</View>
				</Dialog>
          <FlatList
						style={styles.listContacts}
						data={this.state.data}
						keyExtractor={ (item, index) => index }
						renderItem={ ({item}) => this.renderFlatListItem(item) } />
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
		listContacts: {
				flex:1
		},
    item: {
			flex:1,
			flexDirection:"row",
			backgroundColor:"white",
      padding: 10,
      height: 45,
			margin:3,
			borderColor:"#0070C0",
			borderStyle:"solid",
			borderWidth:2
    },
		textItem: {
			fontSize:18,
			fontWeight:"bold",
			color:"black"
		},
		divBotones: {
			flexDirection:"row",
			justifyContent: 'center',
			alignItems: 'center',
		},
		btnNew: {
			margin:5
		},
		divBotonMenu:
	  {
	    flexDirection:"row",
	    justifyContent: 'center',
	    alignItems: 'center',
	    margin:10,
	    padding:5
	  },
		buttonDialog:
		{
			padding:20,
			justifyContent: 'center',
			alignItems: 'center',
		},
		textDialog:
		{
			color:"#0070C0",
			fontSize:20
		},
		icon:
		{
			marginRight:10
		}
});

export default Contacts;
