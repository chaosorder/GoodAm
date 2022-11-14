/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from "react-native-push-notification";

PushNotification.configure({
  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log("NOTIFICATION:", notification);
  },

  // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
  onAction: function (notification) {
    if (notification.action == "I'm up!") {
      console.log("END");
    }
    else {
      console.log("SNOOZE");
    }
    //console.log("ACTION:", notification.action);
    //console.log("NOTIFICATION:", notification);

    // process the action
  },

  popInitialNotification: true,
});

// (function() {
//   // Register all the valid actions for notifications here and add the action handler for each action
//   PushNotification.registerNotificationActions(['Accept','Reject','Yes','No']);
//   onAction.addListener('notificationActionReceived', function(action){
//     console.log ('Notification action received: ' + action);
//     const info = JSON.parse(action.dataJSON);
//     if (info.action == 'Accept') {
//       // Do work pertaining to Accept action here
//     } else if (info.action == 'Reject') {
//       // Do work pertaining to Reject action here
//     }
//     // Add all the required actions handlers
//   });
// })();

AppRegistry.registerComponent(appName, () => App);
