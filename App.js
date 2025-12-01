import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Import the screens WITH .js EXTENSION to force resolution
import Start from './components/Start.js';
import Chat from './components/Chat.js';

// Import Firebase
import { initializeApp } from "firebase/app";
import { getFirestore, disableNetwork, enableNetwork } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA0BoC0hGdeEHopAzTEd-SHKzxj_I2vOfQ",
  authDomain: "chat-app-8f2d4.firebaseapp.com",
  projectId: "chat-app-8f2d4",
  storageBucket: "chat-app-8f2d4.firebasestorage.app",
  messagingSenderId: "586998598178",
  appId: "1:586998598178:web:fa980ceec9e414d9f9d87b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Start"
      >
        <Stack.Screen
          name="Start"
          component={Start}
        />
        <Stack.Screen
          name="Chat"
        >
          {/* Pass the database prop to the Chat screen */}
          {props => <Chat {...props} db={db} />}
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