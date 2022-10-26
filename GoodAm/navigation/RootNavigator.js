import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigator from './TabNavigator';

const RootNavigator = props => {
  return (
    <NavigationContainer>
      <TabNavigator email={props.email} />
    </NavigationContainer>
  );
};

export default RootNavigator;
