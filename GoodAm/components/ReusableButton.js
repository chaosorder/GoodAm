/*
Customizable button that allows for us to choose the color, size and onPress capabilities.
*/
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../assets/colors';

export const ReusableButton = ({
  title,
  onPress,
  color,
  backgroundColor,
  width,
}) => {
  return (
    <TouchableOpacity
      style={[
        style.button,
        backgroundColor && {backgroundColor},
        width && {width},
      ]}
      onPress={onPress}>
      <Text style={[style.text, color && {color}]}>{title}</Text>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  button: {
    marginTop: 15,
    marginHorizontal: 3,
    paddingVertical: 12,
    borderRadius: 25,
    width: '60%',
    alignItems: 'center',
    backgroundColor: COLORS.indigoDye,
  },
  text: {
    fontWeight: '500',
    fontSize: 20,
    color: COLORS.lemonChiffon,
  },
});
