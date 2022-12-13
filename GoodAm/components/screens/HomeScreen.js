/*
Landing screen for the home tab, default landing page for app after login
*/
import React from 'react';
import {
  Button,
  View,
  Text,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import {useState} from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';
import firestore from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {firebase} from '@react-native-firebase/firestore';

const HomeScreen = props => {
  const email = firebase.auth().currentUser.email;

  return (
    <View style={style.container}>
      <Text style={style.font}>Welcome {email}</Text>
      <Text style={style.font}>Home</Text>
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

export default HomeScreen;
