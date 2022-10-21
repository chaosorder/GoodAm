import React from 'react';
import {View, Text, Button} from 'react-native';
import {StyleSheet} from 'react-native';

const AlarmScreen = () => {
  return (
    <View style={style.container}>
      <Text style={style.font}>Alarm</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    color: '#fff',
  },
});

export default AlarmScreen;
