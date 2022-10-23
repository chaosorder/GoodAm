import RootNavigator from './navigation/RootNavigator';
import React, { useState, useEffect } from 'react';
import { View, Text , StatusBar, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


logOff = () => {
  auth()
  .signOut()
  .then(() => console.log('User signed out!'));
}

GoogleSignin.configure({
  webClientId: '541770806381-3prnmcl555bfnna1ffrgcl3d30c74g6g.apps.googleusercontent.com',
});

onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
  // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
}

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null;

  if (!user) {
    return (
      <>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>
        <Text>Login</Text>
        <Button
        title="Google Sign-In"
        onPress={() => this.onGoogleButtonPress().then(() => console.log('Signed in with Google!'))}
        />
      </>
    );
  }

  return (
    <>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text>Welcome {user.email}</Text>
      <Button title = "Log off" onPress={this.logOff} />
      <StatusBar />
      <RootNavigator />
    </>
  );
}

export default App;
