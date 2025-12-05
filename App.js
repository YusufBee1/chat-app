import { useEffect } from 'react';
import { StyleSheet, Alert } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useNetInfo } from '@react-native-community/netinfo';

// Import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0BoC0hGdeEHopAzTEd-SHKzxj_I2vOfQ",
  authDomain: "chat-app-8f2d4.firebaseapp.com",
  projectId: "chat-app-8f2d4",
  storageBucket: "chat-app-8f2d4.firebasestorage.app",
  messagingSenderId: "586998598178",
  appId: "1:586998598178:web:fa980ceec9e414d9f9d87b"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// Initialize Storage
const storage = getStorage(app);

const Stack = createNativeStackNavigator();

const App = () => {
  const connectionStatus = useNetInfo();

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert("Connection Lost!");
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {props => (
            <Chat 
              {...props} 
              db={db} 
              isConnected={connectionStatus.isConnected} 
              storage={storage}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;