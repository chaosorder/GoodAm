import React from 'react';
import {StatusBar} from 'react-native';

import RootNavigator from './navigation/RootNavigator';

const App = () => {
  return (
    <>
      <StatusBar />
      <RootNavigator />
    </>
  );
};

export default App;
