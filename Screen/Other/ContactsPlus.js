import React from 'react';
import { View, FlatList, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Searchbar ,  Surface} from 'react-native-paper';
import { Avatar } from 'react-native-paper';
import { TouchableHighlight } from 'react-native-gesture-handler';
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';

function añadir(profile, USER){
    const user = (auth().currentUser.email.replace('.',''));
    const reference = firebase.database().ref('Users');
    const email =profile.email.replace('.', '');
    var  profA= {
        message: {
            noend : {
              id:Date.now(),
              who :`${user}`,
              message: 'ESTE ES EL COMIENZO DEL CHAT',
              order: 0
            }
          },
        id:Date.now(),
        nombre: `${email}`
    }
    //usuario actual
    
    reference.child(`${user}`).child("contacts").child(`${email}`).set(profA)
    var  profB= {
        message: {
            noend : {
              id:Date.now(),
              who :`${email}`,
              message: 'ESTE ES EL COMIENZO DEL CHAT',
              order: 0
            }
          },
        id:Date.now(),
        nombre: `${user}`
    }
    //usuario añadido
    reference.child(`${email}`).child("contacts").child(`${user}`).set(profB)
}

export default function ContactsPlus({route}) {
    const [searchQuery, setSearchQuery] = React.useState('');
    const email = [];
    const onChangeSearch = query => {setSearchQuery(query)};
    const{USER}=route.params
    const user =Object.values(USER.USER);
    const arraycpy =Object.keys((Object.values(USER))[0])

    const onChangeSearchAnime = ()=>{
        let a=searchQuery 
        for(i in arraycpy){if(arraycpy[i].indexOf(a)!=-1){email.push(arraycpy[i])} }
       user.push({uid:13})

    };

    const renderItem = ({item}) => {
        return(
            <TouchableHighlight onPress={()=>añadir(item, user)}>
            <View style={{flexDirection:'row', margin: 10}}>
            <Avatar.Text size={40} label="XD"  />
            <View style={{marginHorizontal:10}}>
            <Text style={{color:'black'}}>{item.name}</Text>
            <Text style={{color:'black'}}>{item.email}</Text>
            </View>
            </View>
            </TouchableHighlight>


        )
    }
        

    return(
        <View style={{flex:1, backgroundColor:'white'}}>
        <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        />
        
        <FlatList
        data={user}
        renderItem={renderItem}
        keyExtractor={item => item.uid}
        />

        </View>
    );
}