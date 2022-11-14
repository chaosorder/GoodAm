/*
Landing screen for the charity tab
*/
import React, { useEffect } from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton'
import PushNotification from 'react-native-push-notification';

const createChannels = () => {
  PushNotification.createChannel({
    channelId: 'alarm-channel',
    channelName: 'Alarm Channel'
  });
}

const handleNotification = () => {
  PushNotification.localNotificationSchedule({
    channelId: 'alarm-channel',
    title: 'Good AM',
    message: 'It\'s time to wake up!',
    date: new Date(Date.now() + 10 * 1000),
    actions: ["I'm up!", "Just 15 more minutes..."],
    invokeApp: false
  })
}

const CharityScreen = () => {
  useEffect(() => {
    createChannels();
  }, []);

  return (
    <View style={style.container}>
      <ReusableButton title='Click me!' onPress={handleNotification}></ReusableButton>
      {/* <Text style={style.font}>Charity</Text> */}
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
