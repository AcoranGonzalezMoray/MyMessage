import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableHighlight, StatusBar } from 'react-native';
import { Avatar, Surface, Provider} from 'react-native-paper';
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { FloatingAction } from "react-native-floating-action";
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';

const gouOut = ()=>{auth().signOut().then(() => console.log('User signed out!'));}

const actions = [
    {
      text: "Contacts",
      icon: <Icon name="plus" color={"#009eff"}/>,
      name: "ContactsPlus",
      color:'white',
      textColor:'black',
      position: 1
    },
    {
     text: "Sign out",
     icon: <Icon name="sign-out" color={"#009eff"}/>,
     name: "2",
     color:'white',
     position: 2
    }
];

export default function Contacts() {
    const user = (auth().currentUser.email.replace('.',''));
    const reference = firebase.database().ref('Users');
    const [data,setData] = useState([]);
    const [USER,setUSER] = useState([]);
    const [read_only_one] = useState();
    const array = [...Object.values(data)]

    useEffect(()=>{
      reference.child(`${user}`).on('value', (snap)=>{setData(snap.val().contacts)});
      reference.once('value', (snap)=>{setUSER(snap.val())});
    },[read_only_one])

    const navigation = useNavigation()  
    
    function getname(user){
      const mssg= [...Object.values(USER)]
      for (i=0; i < mssg.length ;i++){if(mssg[i].email.replace('.', '') ==  user) return mssg[i].name;}
      return "null";
    }

    const renderItem = ({item}) => {
      var name = getname(item.nombre);
      return(
          <Provider>          
            <TouchableHighlight onPress={()=>navigation.navigate("Chat", {item:{item}, name:name})}>
            <Surface style={{flexDirection:'row', margin:10, padding:8, backgroundColor:'white', borderRadius:20}} elevation={5}>
            <Avatar.Text size={50} label="XD"  />
            <View style={{marginHorizontal:10}}>
            <Text style={{color:'black'}}>{item.nombre}</Text>
            <Text style={{color:'black'}}>{name}</Text>
            </View>
            </Surface>         
            </TouchableHighlight>
          </Provider>
      )
    }
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor="#009eff" barStyle="light-content" /> 
        <FlatList
        data={array}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        />
        <FloatingAction
        color='white'
        iconColor='#009eff'
        actions={actions}
        onPressItem={name => {
          if(name=='ContactsPlus')navigation.navigate(`${name}`,{USER:{USER}});
          else gouOut();
           
        }}
        />
        </View>
    );
}