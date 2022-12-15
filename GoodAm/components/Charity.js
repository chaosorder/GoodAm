/*
Customizable nonprofit
*/
import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS} from '../assets/colors';

export const ReusableButton = ({
  title,
  onPress,
  website
}) => {
  return (
    <TouchableOpacity 
                style = {{
                    justifyContent: 'center',
                    padding: 10,
                    height: 30,
                    width: '2%',
                    flexDirection: 'row',
                    
                }}
                onPress={() => changeStarIcon(i)}
                >
             {starIcon[i] == 0  && <Image source={require('./starEmpty.png')} style = {{width: 25, height: 25}}/>}
             {starIcon[i] == 1  && <Image source={require('./starFilled.png')} style = {{width: 25, height: 25}}/>}
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
