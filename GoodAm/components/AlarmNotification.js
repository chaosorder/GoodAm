import notifee, { TriggerType, AndroidImportance, AndroidCategory, EventType} from '@notifee/react-native';

export const createNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'gam',
    name: 'Alarm Channel',
    vibration: true,
    sound: 'alarm',
    vibration: true,
    vibrationPattern: [180, 121, 134, 300, 289, 123, 134, 300, 621, 121, 134, 300, 289, 123, 134, 300],
    category: AndroidCategory.ALARM,
    importance: AndroidImportance.HIGH,
  });
};

export const handleNotification = async (date) => {
    const trigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(), // Have to investigate if this takes into account day of the week.
    };
  
    await notifee.createTriggerNotification({
      title: 'It\'s time to wake up!',
      android: {
        channelId: 'gam',
        ongoing: true,
        vibrationPattern: [180, 121, 134, 300, 289, 123, 134, 300, 621, 121, 134, 300, 289, 123, 134, 300],
        category: AndroidCategory.ALARM,
        importance: AndroidImportance.HIGH,
        loopSound: true,
        fullScreenAction: {
          id: 'default',
          mainComponent: 'custom-component',
        },
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

  // notifee.onBackgroundEvent(async ({ type, detail }) => {
//   if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
//     console.log("BACKGROUND: You a bitch for that.");
//     await notifee.cancelNotification(detail.notification.id);
//   }
//   else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake') {
//     console.log("BACKGROUND: Rise and shine, cupcake!");
//     await notifee.cancelNotification(detail.notification.id);
//   }
// });

// notifee.onForegroundEvent(({ type, detail }) => {
//   if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
//     console.log("FOREGROUND: You a bitch for that.");
//     notifee.cancelNotification(detail.notification.id);
//   }
//   else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake'){
//     console.log("FOREGROUND: Rise and shine, cupcake!");
//     notifee.cancelNotification(detail.notification.id);
//   }
// });