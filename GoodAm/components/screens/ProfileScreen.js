/*
Landing screen for the profile tab
*/
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {logOff} from '../../App';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {firebase} from '@react-native-firebase/firestore';

const ProfileScreen = props => {
  const email = firebase.auth().currentUser.email;
  return (
    <View style={style.container}>
      <Text style={style.font}>Welcome {email}</Text>
      <ReusableButton title="Log off" onPress={logOff}></ReusableButton>
    </View>
  );
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

export default ProfileScreen;
