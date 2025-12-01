import { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput, 
  ImageBackground, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';

import { getAuth, signInAnonymously } from "firebase/auth";

// UPDATED PATH: Added /images/ to match your folder structure
const image = require('../assets/images/BackgroundImage.png'); 

const Start = ({ navigation }) => {
  const [name, setName] = useState('');
  const [background, setBackground] = useState('');
  const colors = ['#090C08', '#474056', '#8A95A5', '#B9C6AE'];
  
  const auth = getAuth();

  const signIn = () => {
    signInAnonymously(auth)
      .then(result => {
        navigation.navigate('Chat', { 
          userID: result.user.uid,
          name: name,
          color: background 
        });
        Alert.alert("Signed in Successfully!");
      })
      .catch((error) => {
        Alert.alert("Unable to sign in, try later again.");
      })
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        
        <Text style={styles.appTitle}>Chat App</Text>
        
        <View style={styles.inputBox}>
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder='Your Name'
          />

          <Text style={styles.chooseColorText}>Choose Background Color:</Text>
          <View style={styles.colorButtonContainer}>
            {colors.map((color) => (
              <TouchableOpacity
                key={color}
                style={[
                  styles.colorButton,
                  { backgroundColor: color },
                  background === color && styles.selectedColor,
                ]}
                onPress={() => setBackground(color)}
              />
            ))}
          </View>

          <TouchableOpacity
            style={styles.button}
            onPress={signIn}
          >
            <Text style={styles.buttonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>

      </ImageBackground>
      
      {Platform.OS === 'ios' ? <KeyboardAvoidingView behavior="padding" /> : null}
      {Platform.OS === 'android' ? <KeyboardAvoidingView behavior="height" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 45,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 80,
  },
  inputBox: {
    backgroundColor: 'white',
    height: '44%',
    width: '88%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 20,
    borderRadius: 4
  },
  textInput: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    width: '88%',
    opacity: 50,
    padding: 15,
    borderWidth: 1,
    borderColor: '#757083',
    borderRadius: 4
  },
  chooseColorText: {
    fontSize: 16,
    fontWeight: '300',
    color: '#757083',
    opacity: 100,
  },
  colorButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  colorButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#757083',
  },
  button: {
    backgroundColor: '#757083',
    width: '88%',
    padding: 20,
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  }
});

export default Start;