/*
Landing screen for the charity tab
*/
import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import notifee from '@notifee/react-native';
import ReusableButton from '../ReusableButton';

const CharityScreen = () => {
  return (
    <View style={style.container}>
      {/* <Text style={style.font}>Charity</Text> */}
      {/* <ReusableButton title={"Click me!"}></ReusableButton> */}
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.naplesYellow,
  },
  font: {
    fontSize: 20,
    color: COLORS.indigoDye,
  },
});

export default CharityScreen;
