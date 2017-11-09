import React, { Component } from 'react';
import {View,Text,FlatList,StyleSheet,AsyncStorage,TouchableOpacity,
Alert,Button,TextInput} from 'react-native';
import baseStyle from '../styles/baseStyle';
import I18n from "../api/I18n";
import {AppLoading } from 'expo';
import Autocomplete from 'react-native-autocomplete-input';
import Api from '../api/Api';
import { FontAwesome,Entypo } from '@expo/vector-icons';

class GroupForm extends Component
{
  allContacts=[];
  static navigationOptions = ({ navigation }) => ({
    title:I18n.t("title_new_group"),
    headerRight:<View style={styles.divBotonesHeader}>
                  <TouchableOpacity style={styles.divBotonSiguiente} onPress={()=>navigation.state.params.onPressNext()}>
                    <Entypo name="arrow-right" size={30} color="#0070C0" />
                  </TouchableOpacity>
                </View>
  });

  constructor(props){
    super(props);
    this.state={contacts:[],contactsSelected:[],appIsReady:false};
    this.updateContacts();
  }

  updateContacts=()=>{
    AsyncStorage.getItem('login').then((value)=>{
      let userLogin=JSON.parse(value);
      Api.getContacts(userLogin.id).then((res)=>{
        contacts=res.response.data;
        allContacts=contacts;
        this.setState({contacts:contacts});
      });
		}).catch((error)=>{
			console.error(error);
		});
  }

  onPressNext=()=>{
    if(this.state.contactsSelected.length > 0){
      this.props.navigation.navigate("GroupFormNext",
      {contactsSelected:this.state.contactsSelected});
    }else{
      Alert.alert("Error",I18n.t("error_contacts_selected"));
    }
  }

  onTyping=(text)=>{
    let contactsFilter=new Array();

    for(i=0;i<allContacts.length;i++)
    {
      if(allContacts[i].contact.name.toLowerCase().indexOf(text.toLowerCase())!=-1)
      {
        contactsFilter.push(allContacts[i]);
      }
    }
    this.setState({contacts:contactsFilter});
  }

  onPressItem=(contact)=>{
    let contactsSelected=this.state.contactsSelected;
    let index=contactsSelected.indexOf(contact);
    if(index==-1){
      contactsSelected.push(contact);
    }else
    {
      contactsSelected.splice(index, 1);
    }
    this.setState({contactsSelected:contactsSelected});
  }

  renderFlatListItem=(item)=>{

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={()=>{this.onPressItem(item.contact)}}
      >
        <View style={styles.divItem}>
          <View style={{flexDirection:"row"}}>
            <Entypo style={styles.icon} name="user" size={20} color="#0070C0" />
            <Text style={styles.textItem}>{item.contact.name}</Text>
          </View>
          {this.renderSelectedIcon(item)}
        </View>
      </TouchableOpacity>
    );
  }
  renderSelectedIcon=(item)=> {
    if(this.state.contactsSelected.indexOf(item.contact)!=-1){
      return(
        <FontAwesome style={styles.imageIcon} name="check-circle" size={22} color="#0070C0" />
      );
    }else{
      return;
    }
  }
  async componentWillMount(){
    await I18n.initAsync();
    this.setState({appIsReady:true});
  }

  render(){
    if(!this.state.appIsReady){
      return(
        <AppLoading />
      );

    }else{
      return(
          <View style={styles.container}>
            <TextInput
              style={styles.txtBuscar}
              placeholder={I18n.t("text_search")+"..."}
              underlineColorAndroid="transparent"
              onChangeText={ text => this.onTyping(text) }
             />
            <FlatList
              style={styles.listContacts}
              data={this.state.contacts}
              extraData={this.state}
              keyExtractor={(item, index) => index}
              renderItem={({item})=>this.renderFlatListItem(item)}
            />
          </View>
      );
    }
  }

  componentDidMount () {
      this.props.navigation.setParams({ onPressNext: this.onPressNext })
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
			backgroundColor:"white",
      padding: 10,
      height: 45,
			margin:3,
			borderColor:"#0070C0",
			borderStyle:"solid",
			borderWidth:2
    },
		textItem:{
			fontSize:18,
			fontWeight:"bold",
			color:"black"
		},
    divItem:{
      flex:1,
      backgroundColor: 'white',
      flexDirection:"row",
      justifyContent: 'space-between',
    },
    divBotones:
		{
			flexDirection:"row",
			justifyContent: 'center',
			alignItems: 'center',
		},
    divBotonesHeader:
    {
      flexDirection:"row",
			justifyContent: 'center',
			alignItems: 'center',
    },
    divBotonSiguiente:
    {
      flexDirection:"row",
      justifyContent: 'center',
      alignItems: 'center',
      margin:10,
      padding:5
    },
    txtBuscar:
    {
      padding:10,
      fontSize:20
    },
    icon:
		{
			marginRight:10
		}
});

export default GroupForm;
