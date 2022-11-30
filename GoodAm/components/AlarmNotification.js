import notifee, { TriggerType, AndroidImportance, AndroidCategory, EventType} from '@notifee/react-native';

/* Creates the initial notification channel if one does not already exist */
export const createInitialNotificationChannel = async () => {
  await notifee.createChannel({
    id: 'gam',
    name: 'Alarm Channel',
    vibration: true,
    sound: 'alarm',
    vibration: true,
    vibrationPattern: [180, 121, 134, 300, 289, 123, 134, 300, 621, 121, 134, 
      300, 289, 123, 134, 300],
    category: AndroidCategory.ALARM,
    importance: AndroidImportance.HIGH,
  });
};

/* Schedule a notification to be displayed at a specific time */
export const scheduleNotification = async (triggerTime) => {
  // TODO:: Add more flexible scheduling (Recurring, which days of the week, etc.)
  const notificationTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: triggerTime,
  };
  
  await notifee.createTriggerNotification({
    title: 'It\'s time to wake up!',
    android: {
      channelId: 'gam',
      ongoing: true, // User must interact with notification to dismiss
      vibrationPattern: [180, 121, 134, 300, 289, 123, 134, 300, 621, 121, 
        134, 300, 289, 123, 134, 300],
      category: AndroidCategory.ALARM,
      importance: AndroidImportance.HIGH,
      loopSound: true,
      fullScreenAction: {
        id: 'default',
        mainComponent: 'snooze-screen', // Component to be launched when notification occurs
      },
      // Notification buttons
      actions: [
        {
          title: 'I\'m awake!',
          pressAction: {
            id: 'awake',
            mainComponent: 'default' // Component to be launched on notification button press
          },
        },
        {
          title: 'Just 15 more minutes...',
          pressAction: {
            id: 'snooze',
            mainComponent: 'snooze-screen', // Component to be launched on notification button press
          },
        },
      ],  
    },
  }, notificationTrigger);
};

/* Handle what happens if a notification event occurs while the application is in the background */
export const handleNotificationBackgroundEvent = async () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
      // TODO:: Add routing to snooze page
      
      await notifee.cancelNotification(detail.notification.id);
    }
    else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake') {
      await notifee.cancelNotification(detail.notification.id);
    }
  });
}

/* Handle what happens if a notification event occurs while the application is in the foreground */
export const handleNotificationForegroundEvent = () => {
  notifee.onForegroundEvent(({ type, detail }) => {
    if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
      // TODO:: Add routing to snooze page 
      notifee.cancelNotification(detail.notification.id);
    }
    else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake'){
      notifee.cancelNotification(detail.notification.id);
    }
  });
}

/* Cancel the notification that triggered that app to open */
export const cancelCurrentNotification = async () => {
  // Get notification that triggered app to open
  const currentNotification = await notifee.getInitialNotification();
  notifee.cancelNotification(currentNotification.notification.id);
}
