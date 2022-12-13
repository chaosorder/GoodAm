import RootNavigator from './navigation/RootNavigator';
import React, {useState, useEffect, useRef} from 'react';
import {AppState, View, Text, StatusBar, StyleSheet, Button} from 'react-native';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import {COLORS} from './assets/colors';
import {ReusableButton} from './components/ReusableButton';
import firestore, {firebase} from '@react-native-firebase/firestore';
import {createInitialNotificationChannel, handleNotificationBackgroundEvent, handleNotificationForegroundEvent, isAlarming } from './components/AlarmNotification.js';
import SnoozeScreen from './components/screens/SnoozeScreen';

//begin auth/login firebase code
export const logOff = () => {
  auth()
    .signOut()
    .then(() => console.log('User signed out!'));
};

GoogleSignin.configure({
  webClientId:
    '541770806381-3prnmcl555bfnna1ffrgcl3d30c74g6g.apps.googleusercontent.com',
});

onGoogleButtonPress = async () => {
  // Check if your device supports Google Play
  await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
  // Get the users ID token
  const {idToken} = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
};

//createInitialNotificationChannel();
handleNotificationBackgroundEvent();
handleNotificationForegroundEvent();

const App = () => {
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  const [alarming, setAlarming] = useState(false);
  const currentState = useRef(AppState.currentState);
  const [state, setState] = useState(currentState.current);

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => { 
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    createInitialNotificationChannel(setAlarming);
    return subscriber; // unsubscribe on unmount
  }, []);

  useEffect(() => {
    const handleChange = AppState.addEventListener('change', changedState => {
      currentState.current = changedState;
      setState(currentState.current);
    });

    if (AppState.currentState == 'active')
    {
      isAlarming().then(result => {
        if (result == true)
        {
          setAlarming(true); 
        }
      });
    }
    
    return () => {
      handleChange.remove();
    };
  }, [AppState.currentState]);

  if (initializing) return null;

  if (!user) {
    return (
      <View style={style.container}>
        <Text style={style.font}>GoodAM Login</Text>
        <ReusableButton
          title="Google Sign-In"
          onPress={() =>
            this.onGoogleButtonPress().then(() =>
              console.log('Signed in with Google!'),
            )
        }></ReusableButton>
      </View>
    ); 
  }
  //end auth/login code

  //initialize database user entry into schema
  if (user) {
    firestore()
      .collection('Users')
      .doc(user.uid)
      .get()
      .then(documentSnapshot => {
        console.log('User exists: ', documentSnapshot.exists);

        if (documentSnapshot.exists) {
          console.log('User data: ', documentSnapshot.data());
        } else {
          firestore()
            .collection('Users')
            .doc(user.uid)
            .set({
              email: user.email,
              uid: user.uid,
            })
            .then(() => console.log('User added to database.'));
          firestore()
            .collection('Users')
            .doc(user.uid)
            .collection('Alarms')
            .doc('TestDummy')
            .set({
              readme:
                'This is where each alarm will be stored with a unique id.',
            })
            .then(() => console.log('Alarm subcollection added'));
        }
      });
  }

  if (!alarming) {
    return (
      <>
        <StatusBar />
        <RootNavigator />
      </> //StatusBar allows for the wifi and clock texts to be visible in the app
      // RootNavigator is the base navigation system for the app, we send in the email in order for other pages to use it.
    );
  } else {
    return (
      // Change this to bring up donation component
      <>
        <SnoozeScreen />
      </>
    );
  } 
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.naplesYellow,
  },
  font: {
    fontSize: 20,
    color: COLORS.indigoDye,
  },
});

export default App;
