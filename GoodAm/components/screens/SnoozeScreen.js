import {AppRegistry, Linking} from 'react-native';
import React from 'react';
import {View, Text, StyleSheet, BackHandler} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {cancelCurrentNotification} from '../AlarmNotification';

/**
 * Cancels alarm notification and directs to charity donation page.
 */
const snoozeClicked = () => {
  cancelCurrentNotification();
  Linking.openURL('https://www.every.org/givedirectly#/donate/card');
};

/**
 * Cancels alarm notification.
 */
const awakeClicked = () => {
  cancelCurrentNotification();
}

/**
 * Screen the user is taken to if their alarm goes off.
 * 
 * @returns         snooze screen page
 */
const SnoozeScreen = props => {
  return (
    <View style={style.container}>
      <Text style={style.font}>Time to wakeup!</Text>
      <ReusableButton  title={'I\'m awake!'} onPress={awakeClicked} />
      <ReusableButton title={'Just 15 more minutes...'} onPress={snoozeClicked} />
    </View>
  );
};

// Create style sheet for snooze screen
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