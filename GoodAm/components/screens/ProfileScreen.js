/*
Landing screen for the profile tab
*/
import React from 'react';
import {View, Text, Button} from 'react-native';
import {StyleSheet} from 'react-native';
import {logOff} from '../../App';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';

const ProfileScreen = props => {
  //takes the email from user as a prop to display, comes from TabNavigator
  return (
    <View style={style.container}>
      <Text style={style.font}>Welcome {props.email}</Text>
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
