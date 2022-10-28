/*
Landing screen for the alarms tab, will house alarms 
to be toggled and the ability to create alarms.
*/
import React, {useState} from 'react';
import {View, Text, TextInput} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import {usersCollection} from '../alarm/usersCollection';
import firestore from '@react-native-firebase/firestore';

const AlarmScreen = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false); //state that allows the modal to pop up and disappear upon button presses
  const [name, setName] = React.useState('');
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    setName('');
  };

  const addName = text => {
    //temporary function to add user input to database
    firestore()
      .collection('Users')
      .add({name: text})
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View style={style.container}>
      <Text style={style.font}>Your Alarms</Text>
      <ReusableButton //create new alarm button, customizable
        title="Create new alarm"
        onPress={handleModal}></ReusableButton>
      <ReusableModal isVisible={isModalVisible}>
        <ReusableModal.Container>
          <ReusableModal.Header title="Create Alarm" />
          <ReusableModal.Body>
            <TextInput //allows for user text input
              placeholderTextColor={COLORS.lemonChiffon}
              style={style.input}
              placeholder="Add Your Name!"
              onChangeText={value => setName(value)}
            />
          </ReusableModal.Body>
          <ReusableModal.Footer>
            <ReusableButton
              title="Create"
              color={COLORS.indigoDye}
              backgroundColor={COLORS.naplesYellow}
              width="50%"
              onPress={() => addName(name)}></ReusableButton>
            <ReusableButton
              title="Cancel"
              onPress={handleModal}
              color={COLORS.indigoDye}
              backgroundColor={COLORS.naplesYellow}
              width="50%"></ReusableButton>
          </ReusableModal.Footer>
        </ReusableModal.Container>
      </ReusableModal>
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
  input: {
    margin: 15,
    height: 40,
    borderColor: COLORS.naplesYellow,
    borderWidth: 3,
    color: COLORS.lemonChiffon,
  },
});

export default AlarmScreen;
