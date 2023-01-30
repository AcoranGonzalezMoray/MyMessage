import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { TextInput , Checkbox} from 'react-native-paper';
import auth from '@react-native-firebase/auth';
import { firebase } from '@react-native-firebase/database';



const Sesion=(user, password, name)=>{
    if(user != '' && password != '' && password.length >6 ){


    const email = user.replace('.', '');
    auth()
    .createUserWithEmailAndPassword(user, password)
    .then(() => {
      var User = {
        uid : `${auth().currentUser.uid}`,
        name : `${name}`,
        email : `${user}`,
        contacts : {
          USER : {
            message: {
              noend : {
                id:Date.now(),
                who : `${user}` ,
                message: 'ESTE ES EL COMIENZO DEL CHAT',
                order: 0
              }
            },
            id:Date.now(),
            nombre: `${name}`
          }
        }
      }
      firebase.database().ref('Users').child(`${email}`).set(User);
    })
    }
  
}

export default function Register() {
    const [textp, setTextp] = React.useState('');
    const [textl, setTextl] = React.useState('');
    const [textn, setTextn] = React.useState('');
    const [checked, setChecked] = React.useState(false);
  
    
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
          <View style={{margin:'10%'}}>
          <TextInput
          label="Name"
          right={<TextInput.Icon icon="mail" />}
          value={textn}
          onChangeText={textn=> setTextn(textn)}
          style={{marginVertical:'4%'}}
          underlineColor='#009eff'
          activeUnderlineColor='#009eff'
        />
          <TextInput
          label="Email"
          right={<TextInput.Icon icon="mail" />}
          value={textl}
          onChangeText={textl=> setTextl(textl)}
          style={{marginVertical:'4%'}}
          underlineColor='#009eff'
          activeUnderlineColor='#009eff'
        />
        <TextInput
          label="Password"
          secureTextEntry
          right={<TextInput.Icon icon="eye" />}
          onChangeText={textp=> setTextp(textp)}
          value={textp}
          style={{marginVertical:'4%'}}
          underlineColor='#009eff'
          activeUnderlineColor='#009eff'
        />
        <View style={{position:'relative',margin:'4%', flexDirection:'row'}}>
        <Checkbox
          status={checked ? 'checked' : 'unchecked'}
          color='#009eff'
          onPress={() => {
            setChecked(!checked);
          }}
        />
        <Text>
        Acceptance, the Terms and Conditions represent the document that helps prevent and resolve problems. For this reason, they are fundamental in many cases to defend oneself in case of abuse. The Terms of Service set out how your product, service or content can be used in a legally binding way.
        </Text>
        </View>


        <Button title="Sign up" color={'#009eff'}  onPress={()=>Sesion(textl, textp, textn)} />
        </View>
      </View>
    );
}