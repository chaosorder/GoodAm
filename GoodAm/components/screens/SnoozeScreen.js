import {AppRegistry} from 'react-native';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {removeCurrentNotification} from '../AlarmNotification';

const SnoozeScreen = props => {
  return (
    <View style={style.container}>
      <Text style={style.font}>Time to wakeup!</Text>
      <ReusableButton  title={'I\'m awake!'} onPress={removeCurrentNotification} />
      <ReusableButton title={'Just 15 more minutes...'} />
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
    fontSize: 26,
    color: COLORS.indigoDye
  },
});

export default SnoozeScreen;
