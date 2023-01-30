import * as React from 'react';
import { View, Text, Button, Image } from 'react-native';
import { TextInput} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';

const createSesion=(user, password)=>{
    if(user != '' && password != '' && password.length >6 ){
    auth().signInWithEmailAndPassword( user, password)
    }
  
}

export default function Login() {
    const [textp, setTextp] = React.useState('');
    const [textl, setTextl] = React.useState('');
    const [checked, setChecked] = React.useState(false);
  
    const navigation = useNavigation()
    return(
        <View style={{flex:1, backgroundColor:'white'}}>
          <Image
          style={{ width: 200,height: 200, alignSelf:'center'}}
          source={require('../../Components/icon.png')}
          />
          <View style={{margin:'10%'}}>
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
        <Button title="Sign iN" color={'#009eff'}  onPress={()=>createSesion(textl, textp)} />
        <Text onPress={()=>navigation.navigate('Register')}>Or Sign Up</Text>
        </View>
      </View>
    );
}