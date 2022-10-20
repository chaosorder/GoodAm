import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import HomeScreen from '../../components/screens/HomeScreen';
import AlarmScreen from '../../components/screens/AlarmScreen';
import CharityScreen from '../../components/screens/CharityScreen';
import ProfileScreen from '../../components/screens/ProfileScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Alarms" component={AlarmScreen} />
      <Tab.Screen name="Charities" component={CharityScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
