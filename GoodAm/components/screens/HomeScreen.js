import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';

const HomeScreen = props => {
  return (
    <View style={style.container}>
      <Text style={style.font}>Welcome {props.email}</Text>
      <Text style={style.font}>Home</Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.naplesYellow,
  },
  font: {
    fontSize: 20,
    color: COLORS.indigoDye,
  },
});

export default HomeScreen;
