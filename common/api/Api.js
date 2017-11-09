import React from 'react';
import FieldFilter from './models/FieldFilter';

class Api {

  static serverPath = "http://owe-desarrollo.us-east-1.elasticbeanstalk.com/api/";
static async addDebts(con){
  console.log('Api request data',con)
  // var rv = {};
  // for (var i = 0; i<con.length;i++)
  //   rv[i]= con[i]
  // return rv
  
  relativePath = "Debts";
  try{
    let response = await fetch(this.serverPath+relativePath,{
      method : 'PUT',
      headers : {
        	'Accept': 'application/json',
  				'Content-Type': 'application/json',
      },
        body: JSON.stringify({
          type: 'Debts', 
          models : con
        })
    })
      
    console.log('respone', response.json());
     
  }catch(error) {
      console.error(error);
    }
}

  static async loginByMail(email, password) {
    relativePath = "login";
    try {
      let response = await fetch(this.serverPath+relativePath, {
  			method: 'POST',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
  				login_type: 'email',
  				model: {
            email: email,
            password: password
          }
  			})
  		});
      return response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async registerByMail(name, surname, email, password) {
    relativePath = "register";
    try {
      let response = await fetch(this.serverPath+relativePath, {
  			method: 'POST',
  			headers: {
  				'Accept': 'application/json',
  				'Content-Type': 'application/json',
  			},
  			body: JSON.stringify({
  				login_type: 'email',
  				model: {
            name: name,
            surnames: surname,
            email: email,
            password: password
          }
  			})
  		});
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async getUsers() {
    relativePath="Users";
    try {
      let response = await fetch(this.serverPath+relativePath);
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }


  static async getContigurations(id_User) {
    relativePath="Configurations";
    filter=new FieldFilter("user_id",idUser,"=","and");
    params=[filter];
    try {
      let response = await fetch(this.serverPath+relativePath+"?filters="+JSON.stringify(params));
      let responseJson = await response.json();
      return responseJson;
    }
    catch(error) {
      console.error(error);
    }
  }

  static async getUser(userID) {
    relativePath="Users";
    try {
      let response = await fetch(this.serverPath+relativePath+"/"+userID);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async getContacts(idUser){
    relativePath="UserContacts";
    filter=new FieldFilter("user_id", idUser, "=", "and");
    //Agrego los modelos extendidos de cada usuario contacto
    relatedModels=["user","contact"];
    params=[filter];
    try {
      let response = await fetch(this.serverPath+relativePath+"?filters="+JSON.stringify(params)+"&relatedModels="+JSON.stringify(relatedModels));
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }

  static async getUsersDebt(debtID) {
    relativePath = "UserDebts";
    filter = new FieldFilter("debt_id", debtID, "=", "and");
    relatedModels = ["Users"];

    params = [filter];
    filterString =  "?filters=" + JSON.stringify(params) + "&relatedModels=" + JSON.stringify(relatedModels);
    try {
      let response = await fetch(this.serverPath + relativePath + filterString);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async getDebtsByUser(userID) {
    console.log("userID " + JSON.stringify(userID))
    relativePath = "WvDebtsByUser";
    filter = new FieldFilter("user_id", userID, "=", "and");
    relatedModels = ["Users"];

    params = [filter];
    filterString =  "?filters=" + JSON.stringify(params) + "&relatedModels=" + JSON.stringify(relatedModels);;
    try {
      let response = await fetch(this.serverPath + relativePath + filterString);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async getDebtCreditor(userID, debtID) {
    console.log("userID " + JSON.stringify(userID))
    relativePath = "UserDebts";
    filterUser = new FieldFilter("user_id", userID, "=", "and");
    filterDebt = new FieldFilter("debt_id", debtID, "=", "and");

    params = [filterUser, filterDebt];
    filterString =  "?filters=" + JSON.stringify(params);
    try {
      let response = await fetch(this.serverPath + relativePath + filterString);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async findUsersByPhone(phoneNumber){
    relativePath="Users";
    filter=new FieldFilter("telephone","%25"+phoneNumber+"%","like","and");
    //Agrego los modelos extendidos de cada usuario contacto
    params=[filter];
    try {
      let url=this.serverPath+relativePath;
      params="?filters="+JSON.stringify(params);
      url=url+params;
      console.log(url);
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }

  static async findUsersByEmail(email){
    relativePath="Users";
    filter=new FieldFilter("email","%25"+email+"%","like","and");
    //Agrego los modelos extendidos de cada usuario contacto
    params=[filter];
    try {
      let url=this.serverPath+relativePath+"?filters="+JSON.stringify(params);
      let response = await fetch(url);
      let responseJson = await response.json();
      return responseJson;
    } catch(error) {
      console.error(error);
    }
  }

  static async findUsersByEmailOrPhone(value) {
	   relativePath = "Users"
	   params = new Array();
	   params.push(new FieldFilter("email", "%25" + value + "%", "like", "and"));
	   params.push(new FieldFilter("telephone", "%25" + value + "%", "like", "or"));

     try {
		     let url = this.serverPath + relativePath + "?filters=" + JSON.stringify(params);
		     let response = await fetch(url);
		     let responseJson = await response.json();
		     return responseJson;
	   } catch (error) {
		     console.error(error);
     }
   }

   static async checkExistUser(value) {
	    relativePath = "Users"
	    params = new Array();
	    params.push(new FieldFilter("email", value, "=", "and"));
	    params.push(new FieldFilter("telephone", value, "=", "or"));
	    try {
		      let url = this.serverPath + relativePath + "?filters=" + JSON.stringify(params);
		      let response = await fetch(url);
		      let responseJson = await response.json();
		      return responseJson;
	    } catch (error) {
		      console.error(error);
	    }
    }

  static async addContact(userId, contactId) {
      relativePath = "UserContacts";
      try {
        let response = await fetch(this.serverPath+relativePath, {
  			    method: 'PUT',
  			    headers: {
  				            'Accept': 'application/json',
  				            'Content-Type': 'application/json',
  			              },
  			    body: JSON.stringify({
      			models:[{
              user_id: userId,
              contact_id: contactId
            }]
  			})
  		});
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }
  static async addSettings(setting) {
console.log(setting,'sett')
      relativePath = "Configurations";
      try {
        let response = await fetch(this.serverPath+relativePath, {
  			    method: 'PUT',
  			    headers: {
  				            'Accept': 'application/json',
  				            'Content-Type': 'application/json',
  			              },
  			    body: JSON.stringify({
      			models:[setting]
  			})
  		});
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async getDebts() {
    relativePath = "Debts";
    try {
      let response = await fetch(this.serverPath + relativePath);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async addGroup(groupName, contactsSelected){
    relativePath = "Conversations";
    try {
      let response = await fetch(this.serverPath + relativePath, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          models:[{
            name:groupName,
            UsersConversation: contactsSelected,
          }],
          relatedModels: ["UsersConversation"]
        })}
      );
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }


  static async getStatistics() {
    relativePath = "VwStatistics";
    try {
      let response = await fetch(this.serverPath + relativePath);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }


  static async getSettings(userId) {
    relativePath = "Configurations";
    params = new Array();
    params.push(new FieldFilter("user_id", userId, "=", "and"));
    try {
      let url = this.serverPath + relativePath + "?filters=" + JSON.stringify(params);
      let response = await fetch(url);
      return await response.json();
    } catch(error) {
      console.error(error);
    }
  }

  static async postExponentToken(token, userID) {
    relativePath = "Users";

    let response = await fetch(this.serverPath + relativePath, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        models:[{
          id: userID,
          exponent_token: token,
        }]
      }),
    });
  }

  static async getGroups(userId){
    relativePath="UsersConversation";
    filter=new FieldFilter("user_id", userId, "=", "and");
    //Agrego los modelos extendidos de cada usuario contacto
    relatedModels=["Conversation"];
    params=[filter];
    try {
      let response = await fetch(this.serverPath+relativePath+"?filters="+JSON.stringify(params)+"&relatedModels="+JSON.stringify(relatedModels));
      let responseJson = await response.json();
      return responseJson;

    } catch(error) {
      console.error(error);
    }
  }



}

export default Api;
