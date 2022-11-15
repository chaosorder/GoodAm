/*
Landing screen for the charity tab
*/
import {React, useEffect} from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import notifee, { TimestampTrigger, TriggerType, AndroidImportance, AndroidCategory } from '@notifee/react-native';
import {ReusableButton} from '../ReusableButton';

const createChannel = async () => {
  await notifee.createChannel({
    id: 'alarm',
    name: 'Alarm Channel',
    //vibration: true,
    sound: 'alarm',
  });
};

const handleNotification = async () => {
  // Create a time-based trigger
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: new Date(Date.now() + 3 * 1000).getTime(),
  };

  await notifee.createTriggerNotification({
    title: 'It\'s time to wake up!',
    //body: 'Main body content of the notification',
    android: {
      channelId: 'alarm',
      category: AndroidCategory.CALL,
      importance: AndroidImportance.HIGH,
      // fullScreenAction: {
      //   id: 'default',
      //   mainComponent: 'custom-component',

      //   id: 'full-screen',
      //   launchActivity: 'com.awesome.app.FullScreenActivity',
      // },
      actions: [
        {
          title: 'I\'m awake!',
          icon: 'https://my-cdn.com/icons/snooze.png',
          pressAction: {
            id: 'awake',
          },
        },
        {
          title: 'Just 15 more minutes...',
          pressAction: {
            id: 'snooze'
          },
        },
      ],  
    },
  },
  trigger
  );
};

const CharityScreen = () => {
  useEffect(() => {
    createChannel();
  }, []);

  return (
    <View style={style.container}>
      {/* <Text style={style.font}>Charity</Text> */}
      <ReusableButton title={"Click me!"} onPress={handleNotification}></ReusableButton>
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
