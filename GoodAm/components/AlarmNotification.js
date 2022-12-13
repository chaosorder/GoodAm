import notifee, { TriggerType, AndroidImportance, AndroidCategory, EventType} from '@notifee/react-native';
import React from 'react';
import SnoozeScreen from './screens/SnoozeScreen';

let alarmState;

/* Creates the initial notification channel if one does not already exist */
export const createInitialNotificationChannel = async (alarming) => {
  alarmState = alarming;
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

function parseTime(timeString) {	
	if (timeString == '') return null;
	
	var time = timeString.match(/(\d+)(:(\d\d))?\s*(p?)/i);	
	if (time == null) return null;
	
	var hours = parseInt(time[1],10);	 
	if (hours == 12 && !time[4]) {
		  hours = 0;
	}
	else {
		hours += (hours < 12 && time[4])? 12 : 0;
	}	
	var d = new Date();    	    	
	d.setHours(hours);
	d.setMinutes(parseInt(time[3],10) || 0);
	d.setSeconds(0, 0);	 
	return d.getTime();
}

/* Schedule a notification to be displayed at a specific time */
export const scheduleNotification = async (alarmId, triggerTime) => {
  // TODO:: Add more flexible scheduling (Recurring, which days of the week, etc.)
  console.log(parseTime(triggerTime));
  const notificationTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: parseTime(triggerTime),
  };
  
  await notifee.createTriggerNotification({
    id: alarmId,
    title: 'It\'s time to wake up!',
    android: {
      channelId: 'gam',
      smallIcon: 'ic_small_icon',
      color: '#0c4767',
      ongoing: true, // User must interact with notification to dismiss
      vibrationPattern: [180, 121, 134, 300, 289, 123, 134, 300, 621, 121, 
        134, 300, 289, 123, 134, 300],
      category: AndroidCategory.ALARM,
      importance: AndroidImportance.HIGH,
      loopSound: true,
      fullScreenAction: {
        id: 'full-screen',
        mainComponent: 'snooze-screen', // Component to be launched when notification occurs
      },
      // Notification buttons
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
            mainComponent: 'default', // Component to be launched on notification button press
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
      alarmState(true);
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
  const currentNotification = await notifee.getDisplayedNotifications();
  if (currentNotification.length)
    notifee.cancelNotification(currentNotification[0].notification.id);
  alarmState(false);
}

export const cancelScheduledNotification = (alarmId) => {
  notifee.cancelNotification(alarmId);
}

export const isAlarming = async () => {
  if (!(await notifee.getDisplayedNotifications()).length)
    return false;

  return true;
}
