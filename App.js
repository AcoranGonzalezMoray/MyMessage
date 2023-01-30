import * as React from 'react';
import auth from '@react-native-firebase/auth';
import Login from './Screen/Auth/Login';
import Register from './Screen/Auth/Register';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Contacts from './Screen/Other/Contacts'
import ContactsPlus from './Screen/Other/ContactsPlus';
import Chat from './Screen/Other/Chat';
import ErrorBoundary from './Components/LimiteErrores'
const Stack = createStackNavigator();

function App() {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = React.useState(true);
  const [user, setUser] = React.useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  React.useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
    <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} 
      options={{
      title: 'Login',
      headerStyle: {
      backgroundColor: '#009eff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
      }}
      />
      <Stack.Screen name="Register" component={Register} 
      options={{
      title: 'Register',
      headerStyle: {
      backgroundColor: '#009eff',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
      fontWeight: 'bold',
      },
      }}
      />
    </Stack.Navigator>
    </NavigationContainer>
    );
     
  }else if(user){

    return (
      <ErrorBoundary>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contacts" component={Contacts} 
        options={{
        title: 'Contacts',
        headerStyle: {
        backgroundColor: '#009eff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
        }}
        />
        <Stack.Screen name="ContactsPlus" component={ContactsPlus} 
        options={{
        title: 'ContactsPlus',
        headerStyle: {
        backgroundColor: '#009eff',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
        fontWeight: 'bold',
        },
        }}
        />
        <Stack.Screen name="Chat" component={Chat} 
        options={{
          headerShown:false
        }}
        />
      </Stack.Navigator>
      </NavigationContainer>
      </ErrorBoundary>
    );


  }

  
}
export default App