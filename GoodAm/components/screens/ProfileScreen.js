import React from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';

const ProfileScreen = () => {
  return (
    <View style={style.container}>
      <Text style={style.font}>Profile</Text>
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

export default ProfileScreen;
