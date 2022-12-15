/*
Landing screen for the alarms tab, will house alarms 
to be toggled and the ability to create alarms.
// Authors:          Uma Parhar, Cameron Legrand, Ojas Sethi
// Last Revision:    12/13/2022
/////////////////////////////////////////////////////////////
*/
import React, {useState} from 'react';
import {View, Text, TextInput, Platform} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';

const AlarmScreen = () => {
  const [isModalVisible, setIsModalVisible] = useState(false); //state that allows the modal to pop up and disappear upon button presses
  const [name, setName] = useState('');
  
  //days list represents what days the user has selected that this alarm go off on
  //0 element starts with Sunday, 6 being Saturday
  const [days, changeDays] = useState({
    0: 0, 
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });

  //UMA
  //initializes all of the buttons to start with color yellow. 
  //TO TEST THIS: Verify that upon opening the application, all the buttons begin as the color yellow
  const [btnColor, changeBtnColor] = useState({
    0: COLORS.naplesYellow,
    1: COLORS.naplesYellow,
    2: COLORS.naplesYellow,
    3: COLORS.naplesYellow,
    4: COLORS.naplesYellow,
    5: COLORS.naplesYellow,
    6: COLORS.naplesYellow,
  });


  //CAMERON
  const handleModal = () => {
    setIsModalVisible(() => !isModalVisible);
    setName('');
    setDate(new Date(Date.now()));
    setTime(new Date(Date.now()));
    for (let index = 0; index < 7; index++) {
      days[index] = 0;
      btnColor[index] = COLORS.naplesYellow;
    }
  };

  //get the users ID from database
  const uid = firebase.auth().currentUser.uid;

  //CAMERON
  const addAlarmData = (time, date, name, days) => {
    // have this function add alarm data into database
    const alarmID = uuid.v4();
    firestore()
      .collection('Users')
      .doc(uid)
      .collection('Alarms')
      .doc(alarmID)
      .set({
        time: time.toLocaleTimeString(
          [],
          {hour: '2-digit', minute: '2-digit'},
          'en-US',
        ),
        alarmID: alarmID,
        daysOfWeek: days,
        startDate: date.toISOString().split('T')[0],
        startDateDayOfWeek: date.getDay(),
        turnedOn: true,
        name: name, //cr: possibly make optional
      })
      .then(() => {
        console.log('Alarm added');
      });
    handleModal();
  };


  //UMA
  //This method is called when the user clicks on a "day" button.
  //TEST: To test this, open up the application->create a new alarm->toggle the day button on and off. Verify that the 
  //colors change appropriately, and that the database reflected the toggling
  const handleDayButtonPress = day => {
    const toChangeDay = day;
    //If the button was already selected, clear the selection, as they don't want this day include in their alarm settings
    //If not selected, add this day to the alarm settings, and update the corresponding state variables  
    const val = days[toChangeDay] == 0 ? 1 : 0;
    const col = val == 0 ? COLORS.naplesYellow : COLORS.opal;
    changeDays({...days, [toChangeDay]: val});
    changeBtnColor({...btnColor, [toChangeDay]: col});
  };

  //START UMA

  //start date of alarm
  const [date, setDate] = useState(new Date());

  //time of alarm
  const [time, setTime] = useState(new Date(Date.now()));

  //when the user changes the date, change our variable for date to reflect the change
  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  //when the user changes the time, change our variable for time to reflect the change
  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setTime(currentTime);
  };

  //if the user wants to choose a date/time on android, trigger the android date picker to show up
  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      display: 'spinner',
      is24Hour: false,
    });
  };

  //Shows the android date picker if the device accessing the application has android OS
  const showDatePickerAndroid = () => {
    if (Platform.OS == 'android') {
      showMode('date');
    }
  };

 //Shows the android time picker if the device accessing the application has android OS
  const showTimePicker = () => {
    if (Platform.OS == 'android') {
      showMode('time');
    }
  };

  //END UMA


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
              placeholder="Alarm Name"
              onChangeText={value => setName(value)}
            />
            {Platform.OS == 'ios' && (
              <View style={style.alarmButtons}>
                <Text style={style.popupText}>Start Date</Text>
                <DateTimePicker
                  value={date}
                  mode="date"
                  textColor={COLORS.naplesYellow}
                  minimumDate={new Date(Date.now())}
                  onChange={onChangeDate}
                />
              </View>
            )}

            {Platform.OS == 'ios' && (
              <View style={style.alarmButtons}>
                <Text style={style.popupText}>Alarm Time</Text>
                <DateTimePicker
                  value={time}
                  mode="time"
                  textColor={COLORS.naplesYellow}
                  onChange={onChangeTime}
                />
              </View>
            )}

            {Platform.OS == 'android' && (
              <View style={style.alarmButtons}>
                <Text style={style.popupText}>Start Date</Text>
                <ReusableButton
                  style={style.popupText}
                  onPress={showDatePicker}
                  title={date.toDateString()}
                  onChange={onChangeDate}
                />
              </View>
            )}

            {Platform.OS == 'android' && (
              <View style={style.alarmButtons}>
                <Text style={style.popupText}>Alarm Time</Text>
                <ReusableButton
                  style={style.popupText}
                  onPress={showTimePicker}
                  title={date.toLocaleTimeString()}
                  onChange={onChangeTime}
                />
              </View>
            )}

            <View style={style.buttonGroup}>
              <ReusableButton //small edit, changed so that sunday is day zero, so we can use a built in date method
                onPress={() => handleDayButtonPress(0)}
                backgroundColor={btnColor[0]}
                color={COLORS.indigoDye}
                title="Su"
                width="12%"
              />
              <ReusableButton
                onPress={() => handleDayButtonPress(1)}
                backgroundColor={btnColor[1]}
                color={COLORS.indigoDye}
                title="M"
                width="12%"
              />
              <ReusableButton
                onPress={() => handleDayButtonPress(2)}
                backgroundColor={btnColor[2]}
                color={COLORS.indigoDye}
                title="Tu"
                width="12%"
              />
              <ReusableButton
                onPress={() => handleDayButtonPress(3)}
                backgroundColor={btnColor[3]}
                color={COLORS.indigoDye}
                title="W"
                width="12%"
              />
              <ReusableButton
                onPress={() => handleDayButtonPress(4)}
                backgroundColor={btnColor[4]}
                color={COLORS.indigoDye}
                title="Th"
                width="12%"
              />
              <ReusableButton
                onPress={() => handleDayButtonPress(5)}
                backgroundColor={btnColor[5]}
                color={COLORS.indigoDye}
                title="F"
                width="12%"
              />
              <ReusableButton
                onPress={() => handleDayButtonPress(6)}
                backgroundColor={btnColor[6]}
                color={COLORS.indigoDye}
                title="Sa"
                width="12%"
              />
            </View>
          </ReusableModal.Body>
          <ReusableModal.Footer>
            <ReusableButton
              title="Create"
              color={COLORS.indigoDye}
              backgroundColor={COLORS.naplesYellow}
              width="50%"
              onPress={() =>
                addAlarmData(time, date, name, days)
              }></ReusableButton>
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
    height: 45,
    top: 10,
    borderColor: COLORS.naplesYellow,
    borderWidth: 3,
    color: COLORS.lemonChiffon,
    fontSize: 20,
  },
  alarmButtons: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    fontSize: 20,
    color: COLORS.naplesYellow,
  },
  popupText: {
    margin: 15,
    top: 15,
    right: 15,
    height: 40,
    color: COLORS.lemonChiffon,
    fontSize: 20,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    color: COLORS.indigoDye,
  },
});

export default AlarmScreen;
