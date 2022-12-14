/**
* AUTHOR(S): Noah Stewart
* CREATED: 11/18/2022
* UPDATED: 12/14/2022
* 
* Module for handling the creation, deletion, and tracking of alarm 
* notifications. 
*/

import notifee, { TriggerType, 
  AndroidImportance, 
  AndroidCategory, 
  EventType } from '@notifee/react-native';

let alarmState; // Keeps track of whether or not an alarm is currently sounding.

/**
* Creates the Android notification channel for alarms and passes through
* a state handler function to allow tracking of whether or not an alarm is 
* currently sounding. 
* 
* @param alarming          the alarm state handler function
*/ 
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

/**
* Creates and returns a Date object from a database alarm entry's time string.
* 
* @param {string} timeString          alarm entry's alarm time
* @returns                            date object set to desired time       
*/
const parseTime = (timeString) => {	
  if (timeString == '') return null;

  // Remove all non integers from string
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

/**
* Schedules an alarm notification to be displayed at a specific time.
* 
* @param {string} alarmId          id of alarm from the database
* @param {string} triggerTime      time for notification to be displayed
*/
export const scheduleNotification = async (alarmId, triggerTime) => {
  const notificationTrigger = {
    type: TriggerType.TIMESTAMP,
    timestamp: parseTime(triggerTime),
  };
  
  await notifee.createTriggerNotification({
    id: alarmId,
    title: 'It\'s time to wake up!',
    android: {
      channelId: 'gam',
      smallIcon: 'ic_small_icon', // Custom icon
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

/**
* Cancels notification if notification button was pressed and app was in the
* background.
*/
export const handleNotificationBackgroundEvent = async () => {
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    // Snooze button pressed
    if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
      await notifee.cancelNotification(detail.notification.id);
    }
    // Awake button pressed
    else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake') {
      await notifee.cancelNotification(detail.notification.id);
    }
  });
}

/**
* Cancels notification if a notification event occurs while the app is in the
* foreground. Sets the alarm state to true if snooze is selected so app can be
* rerouted to the snooze screen.
*/
export const handleNotificationForegroundEvent = () => {
  notifee.onForegroundEvent(({ type, detail }) => {
    // Snooze button pressed
    if (type === EventType.ACTION_PRESS && detail.pressAction.id == 'snooze') {
      alarmState(true);
      notifee.cancelNotification(detail.notification.id);
    }
    // Awake button pressed
    else if (type == EventType.ACTION_PRESS && detail.pressAction.id == 'awake'){
      notifee.cancelNotification(detail.notification.id);
    }
  });
}

/**
* Cancels the notification that triggered the app to open.
*/
export const cancelCurrentNotification = async () => {
  // Get notification that triggered app to open
  const currentNotification = await notifee.getDisplayedNotifications();
  
  if (isAlarming)
    notifee.cancelNotification(currentNotification[0].notification.id);
  
  alarmState(false);
}

/**
 * Cancel a scheduled notification with a specific id.
 * 
 * @param {*} alarmId         alarm's database entry id
 */
export const cancelScheduledNotification = (alarmId) => {
  notifee.cancelNotification(alarmId);
}

/**
 * Checks if a alarm is currently alarming.
 * 
 * @returns         true if alarming, false otherwise
 */
export const isAlarming = async () => {
  if (!(await notifee.getDisplayedNotifications()).length)
    return false;

  return true;
}