/*
Landing screen for the charity tab
*/
import {React, useEffect} from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import notifee, { TriggerType, AndroidImportance, AndroidCategory, EventType} from '@notifee/react-native';
import {ReusableButton} from '../ReusableButton';

const createChannel = async () => {
  await notifee.createChannel({
    id: 'nosh2',
    name: 'Alarm Channel',
    vibration: true,
    sound: 'alarm',
    category: AndroidCategory.CALL,
    importance: AndroidImportance.HIGH,
  });
};

const handleNotification = async () => {
  createChannel();
  // Create a time-based trigger
  const trigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: new Date(Date.now() + 3 * 1000).getTime(),
  };

  await notifee.createTriggerNotification({
    title: 'It\'s time to wake up!',
    android: {
      channelId: 'nosh2',
      ongoing: true,
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
          pressAction: {
            id: 'awake',
          },
        },
        {
          title: 'Just 15 more minutes...',
          pressAction: {
            id: 'snooze',
            launchActivity: 'default'
          },
        },
      ],  
    },
  },
  trigger
  );
};

notifee.onBackgroundEvent(async ({ type, detail }) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
    console.log("BACKGROUND: You a bitch for that.");
    await notifee.cancelNotification(detail.notification.id);
  }
  else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake') {
    console.log("BACKGROUND: Rise and shine, cupcake!");
    await notifee.cancelNotification(detail.notification.id);
  }
});

notifee.onForegroundEvent(({ type, detail }) => {
  if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
    console.log("FOREGROUND: You a bitch for that.");
    notifee.cancelNotification(detail.notification.id);
  }
  else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake'){
    console.log("FOREGROUND: Rise and shine, cupcake!");
    notifee.cancelNotification(detail.notification.id);
  }
});

const CharityScreen = () => {
  useEffect(() => {
    //createChannel();
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
