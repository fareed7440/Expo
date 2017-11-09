import React, { Component } from 'react';
import {Text,View,TextInput,FlatList,StyleSheet,TouchableOpacity,AsyncStorage,Alert} from 'react-native';
import I18n from "../api/I18n";
import baseStyle from '../styles/baseStyle';
import Api from '../api/Api';
import {AppLoading } from 'expo';
import { NavigationActions } from 'react-navigation';
import { Entypo } from '@expo/vector-icons';


class GroupFormNext extends Component{

  contactsSelected=[];

  static navigationOptions = ({ navigation }) => ({
    title:I18n.t("title_new_group"),
    headerRight:<View style={styles.divBotonesHeader}>
                  <TouchableOpacity style={styles.divBotonSiguiente} onPress={()=>navigation.state.params.onPressCreate()}>
                    <Entypo name="check" size={30} color="#0070C0" />
                  </TouchableOpacity>
                </View>
  });

  constructor(props){
    super(props);
    this.state={groupName:"",appIsReady:false};
    this.contactsSelected=this.props.navigation.state.params.contactsSelected;
  }

  renderFlatListItem=(item)=>{

    return (
      <Text style={styles.textItem}>{item.name}</Text>
    );
  }

  onPressCreate=()=>{
    AsyncStorage.getItem('login').then((value)=>{
      let userLogin=JSON.parse(value);
      let contactsSelectedModel=[];

      for(i=0;i<this.contactsSelected.length;i++){
          contactsSelectedModel.push({"user_id":this.contactsSelected[i].id})
      }
      contactsSelectedModel.push({"user_id":userLogin.id})
      Api.addGroup(this.state.groupName,contactsSelectedModel).then((res)=>{
          if(res.result.toUpperCase()=="OK"){
            this.props.navigation.dispatch(resetAction);
          }else{
            console.log(res.mesage);
            Alert.alert(I18n.t("error_add_group"));
          }
      });
    }).catch((error)=>{
      console.error(error);
    });
  };

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
        <View style={baseStyle.container}>
          <Text style={[baseStyle.label,styles.textLabel]}>{I18n.t("text_name")}</Text>
          <TextInput
            style={baseStyle.input}
            autoFocus = {true}
            onChangeText={ (text) => {this.state.groupName = text} }
          />
          <Text style={[baseStyle.label,styles.textLabel]}>{I18n.t("title_contacts")}</Text>
          <FlatList
            style={styles.listContacts}
            data={this.contactsSelected}
            keyExtractor={(item, index) => index}
            renderItem={({item})=>this.renderFlatListItem(item)}
          />
        </View>
      );
    }
  }

  componentDidMount () {
      this.props.navigation.setParams({ onPressCreate: this.onPressCreate})
    }
}

const resetAction = NavigationActions.reset({
  index: 1,
  actions: [
    NavigationActions.navigate({ routeName: 'MainMenu'}),
    NavigationActions.navigate({ routeName: 'Contacts'})
  ]});

const styles=StyleSheet.create({
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
  textLabel:{
    marginTop:10
  },
  textItem:{
    fontSize:18,
    fontWeight:"bold",
    color:"black",
    padding:5
  },
  divBotones:
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
  }
});

export default GroupFormNext;
