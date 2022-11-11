/*
Landing screen for the alarms tab, will house alarms 
to be toggled and the ability to create alarms.
*/
import React, {useState} from 'react';
import {View, Text, TextInput, ScrollView, TouchableOpacity} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import {Alarm} from '../Alarm'
import {usersCollection} from '../alarm/usersCollection';
import firestore from '@react-native-firebase/firestore';

const AlarmScreen = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false); //state that allows the modal to pop up and disappear upon button presses
  const [name, setName] = React.useState('');
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    setName('');
  };
  const [alarms, setAlarms] = useState({
    0: {time: "10:10 PM", active: true},
    1: {time: "10:15 PM", active: true},
    2: {time: "10:20 PM", active: false},
    3: {time: "10:25 PM", active: true},
    4: {time: "10:30 PM", active: false},
    5: {time: "10:35 PM", active: true},
    6: {time: "6:00 AM", active: true},
  })

  const toggleAlarm = (key) => {
    console.log(key);
    newAlarms = {...alarms};
    newAlarms[key] = {time: alarms[key].time, active: !alarms[key].active}
    setAlarms(newAlarms);
  }

  const addName = text => {
    //temporary function to add user input to database
    firestore()
      .collection('Users')
      .add({name: text})
      .then(() => {
        console.log('User added!');
      });
  };

  const buildAlarms = () => {
    let alarmComponents = [];
    for (let key in alarms) {
      alarmComponents.push(
        <Alarm key={key} toggle={toggleAlarm} alarmId={key} data={alarms[key]} />);
    }
    return alarmComponents;
  }

  return (
    <ScrollView style={style.container}>
      <View style={style.header}>
        <Text style={style.font}>Your Alarms</Text>
        <TouchableOpacity
          style={style.addButton}
          onPress={handleModal}>
          <Text style={style.buttonText}>+ Alarm</Text>
        </TouchableOpacity>
      </View>
      {buildAlarms()}
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
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    height: "100%",
    backgroundColor: COLORS.naplesYellow,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end"
  },
  font: {
    marginTop: 80,
    marginBottom: 20,
    marginLeft: 20,
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
  addButton: {
    marginRight: 20,
    marginBottom: 12,
    paddingVertical: 10,
    borderRadius: 25,
    width: '25%',
    alignItems: 'center',
    backgroundColor: COLORS.indigoDye,
  },
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.lemonChiffon,
  }
});

export default AlarmScreen;
