/*
Landing screen for the charity tab
*/
import {React, useEffect} from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {scheduleNotification} from '../AlarmNotification.js';

const CharityScreen = () => {
  return (
    <View style={style.container}>
    {/* <Text style={style.font}>Charity</Text> */}
      <ReusableButton title="click me!" onPress={() => scheduleNotification(Date.now() + 1000 * 10)} />
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
