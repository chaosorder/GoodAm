import {AppRegistry, Linking} from 'react-native';
import React from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {cancelCurrentNotification} from '../AlarmNotification';

const snoozeClicked = () => {
  cancelCurrentNotification();
  Linking.openURL('https://www.every.org/givedirectly#/donate/card');
};

const awakeClicked = () => {
  cancelCurrentNotification();
  BackHandler.exitApp();
}

const SnoozeScreen = props => {
  return (
    <View style={style.container}>
      <Text style={style.font}>Time to wakeup!</Text>
      <ReusableButton  title={'I\'m awake!'} onPress={awakeClicked} />
      <ReusableButton title={'Just 15 more minutes...'} 
        onPress={snoozeClicked} />
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
