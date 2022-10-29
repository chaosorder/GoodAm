/*
Sets up the bottom tab bar with icons, allows for navigation between screens
*/
import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../../components/screens/HomeScreen';
import AlarmScreen from '../../components/screens/AlarmScreen';
import CharityScreen from '../../components/screens/CharityScreen';
import ProfileScreen from '../../components/screens/ProfileScreen';
import {COLORS} from '../../assets/colors';
import Icon from 'react-native-vector-icons/Ionicons';
Icon.loadFont().then(); //not perfect, appears to send a warning to app but still has icons appear

const Tab = createBottomTabNavigator();

const TabNavigator = props => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route, navigation}) => ({
        headerShown: false,
        tabBarStyle: {
          height: 95,
          paddingHorizontal: 0,
          paddingTop: 10,
          backgroundColor: COLORS.indigoDye,
          position: 'absolute',
        },
        tabBarActiveTintColor: COLORS.lemonChiffon,
        tabBarInactiveTintColor: COLORS.opal,
        tabBarShowLabel: true,
        tabBarLabelStyle: {fontSize: 10.5},
        tabBarIcon: ({focused, color, size}) => {
          //assigns icons to each page based on name.
          let iconName;
          if (route.name === 'Home') {
            iconName = 'planet';
          } else if (route.name === 'Alarms') {
            iconName = 'alarm';
          } else if (route.name === 'Charities') {
            iconName = 'rose';
          } else if (route.name === 'Profile') {
            iconName = 'person';
          }
          return <Icon name={iconName} size={35} color={color} />;
        },
      })}>
      <Tab.Screen
        name="Home"
        children={() => <HomeScreen email={props.email} />} //passes user email as a prop to display
      />
      <Tab.Screen name="Alarms" component={AlarmScreen} />
      <Tab.Screen name="Charities" component={CharityScreen} />
      <Tab.Screen
        name="Profile"
        children={() => <ProfileScreen email={props.email} />} //passes user email as a prop to display
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
