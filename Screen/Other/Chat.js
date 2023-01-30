import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StatusBar} from 'react-native';
import { Avatar, Surface,  Card, Title, Paragraph, TextInput, IconButton, Dialog, Portal, Provider, Button} from 'react-native-paper';
import { firebase } from '@react-native-firebase/database';
import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

const renderItem = ({item}) => {
    const user = (auth().currentUser.email.replace('.',''));
    if(item.who==user){
        return(
            <Surface style={{marginLeft:'25%',right:10, alignItems: 'flex-end',justifyContent: 'flex-start', marginVertical:10, padding:8, backgroundColor:'#009eff', borderRadius:20}} elevation={5}>
                <Card.Content >
                <Title style={{color:'white', fontSize:13, fontFamily:'tahoma'}}>{item.message}</Title>
                <Paragraph style={{color:'white', fontSize:10}} >{new Date(item.id).toUTCString()}</Paragraph>
                </Card.Content>  
            </Surface>     
        )
    }else{
        return(
            <Surface style={{marginRight:'25%',marginVertical:10,left:10, padding:8, backgroundColor:'#dae7ed', borderRadius:20}} elevation={5}>
                <Card.Content >
                <Title style={{fontSize:13, fontFamily:'tahoma', color:"black"}}>{item.message}</Title>
                <Paragraph style={{fontSize:10, color:"black"}} >{new Date(item.id).toUTCString()}</Paragraph>
                </Card.Content>
            </Surface>         
        )
    }

}

const sendMessage =(text, nombre, order)=>{
    const user = (auth().currentUser.email.replace('.',''));
    const referenceNotMe = firebase.database().ref('Users').child(`${nombre}`).child('contacts').child(`${user}`).child('message');
    const referenceME = firebase.database().ref('Users').child(`${user}`).child('contacts').child(`${nombre}`).child('message');
    var messageME = {
        id:Date.now(),
        who :`${user}`,
        message: `${text}`,
        order: (order+1)
    }
    let date = Date.now(); 
    if(text!=''){
    //me
    referenceME.child(`message-${date}`).set(messageME)
    //notme
    referenceNotMe.child(`message-${date}`).set(messageME)
    }
}

function mayorid(mssg){
    var existe=0;
    for (i=0; i < mssg.length ;i++)if(mssg[i].order > existe) existe= mssg[i].order;
    return existe;
}

function borrarHistorial(nombre){
    const user = (auth().currentUser.email.replace('.',''));
    const referenceME = firebase.database().ref('Users').child(`${user}`).child('contacts').child(`${nombre}`).child('message');
    var  profA= {
        noend : {
            id:Date.now(),
            who :`${user}`,
            message: 'ESTE ES EL COMIENZO DEL CHAT',
            order: 0
    }}
    referenceME.set(profA);
}

function eliminarUsuario(nombre, navigation){
    const user = (auth().currentUser.email.replace('.',''));
    const referenceME = firebase.database().ref('Users').child(`${user}`).child('contacts').child(`${nombre}`);
    const referenceNotME = firebase.database().ref('Users').child(`${nombre}`).child('contacts').child(`${user}`);
    referenceME.remove();
    referenceNotME.remove();  
    navigation.navigate("Contacts");
}


export default function Chat({route}) {
    const {item} = route.params;
    const {name} = route.params;
    const user = (auth().currentUser.email.replace('.',''));
    const [text, setText] = React.useState("");
    const [mssg, setMssg] = React.useState([]);
    const flatListRef = useRef();
    const [read_only_one] = useState();

    const navigation = useNavigation()  
    useEffect(()=>{
        firebase.database().ref('Users').child(`${user}`).child('contacts').child(`${item.item.nombre}`)
        .on('value', (snap)=>{setMssg([...Object.values(snap.val().message)])});
        
    },[read_only_one])
    
    const order = mayorid(mssg);
    const [visible, setVisible] = React.useState(false);

    const hideDialog = () => setVisible(false);
    const seeDialog = () => setVisible(true);

    return(
        <Provider>
        
        <View style={{flex:1, backgroundColor:'white'}}>
        <StatusBar backgroundColor="#009eff" barStyle="light-content" /> 
        
        <View style={{flexDirection:'row', backgroundColor:"#009eff", alignItems:"center", padding:2}}>
        <IconButton icon="arrow-left" iconColor={"white"} size={25} onPress={()=>navigation.navigate("Contacts")} />
        <Avatar.Text size={50}  />
        <Text style={{color:'white', fontFamily:"bold", fontSize:20,fontWeight:'bold'}}   adjustsFontSizeToFit={true} >  {name}</Text>
        <IconButton style={{position:'absolute',marginLeft:0, right:60}} icon="camera" iconColor={"white"} size={20} onPress={() => console.log('Pressed')} />
        <IconButton style={{position:'absolute',marginLeft:0, right:30}} icon="phone-sync" iconColor={"white"}  size={20} onPress={() => console.log('Pressed')} />
        <IconButton style={{position:'absolute',marginLeft:0, right:0}} icon="message-settings" iconColor={"white"}  size={20} onPress={() => seeDialog()} />
        </View>
        
        <Portal>
        <Dialog style={{backgroundColor:'white'}}  visible={visible} onDismiss={hideDialog}>
            <Dialog.Actions style={{flexDirection:'column',}}>
            <Button  textColor={"#009eff"} onPress={() => borrarHistorial(item.item.nombre)}>Borrar Historial</Button>
            <Button textColor={"#009eff"} onPress={() => eliminarUsuario(item.item.nombre,navigation)}>Eliminar Usuario</Button>
            <Button textColor={"#009eff"} onPress={() => console.log('Ok')}>Reportar</Button>
            </Dialog.Actions>
        </Dialog>
        </Portal>
        


        <FlatList
        data={mssg.sort(function(a, b) {
           return a.order - b.order
            
        })}
        ref={flatListRef}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        onContentSizeChange={()=>flatListRef.current.scrollToEnd({animated: true})}
        />

        <View style={{bottom:3, left:5, flexDirection:'row'}}>
        <TextInput
        label="Enter your text"
        value={text}
        onChangeText={(text) => setText(text)}
        style={{width:'85%', backgroundColor: 'white'}}
        mode='outlined'
        clearTextOnFocus
        outlineColor='#009eff'
        selectionColor='#009eff'
        activeOutlineColor='#009eff'
        textColor='black'
        
        />
        <IconButton iconColor='white' containerColor='#009eff' mode='contained-tonal'  icon='send' onPress={()=>{sendMessage(text, item.item.nombre, order), setText('')}}/>
        </View>

        </View>
        </Provider>
        
    );

}