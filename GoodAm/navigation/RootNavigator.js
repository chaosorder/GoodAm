import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import TabNavigator from './TabNavigator';

const RootNavigator = props => {
  return (
    <NavigationContainer>
      <TabNavigator email={props.email} />
    </NavigationContainer>
    // NavigationContainer houses any navigation systems we may want, we're using TabNavigator only right now.
  );
};

export default RootNavigator;
