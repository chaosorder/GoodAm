/*
Landing screen for the alarms tab, will house alarms 
to be toggled and the ability to create alarms.
*/
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors'; //our colors for the project, just call this everytime
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';
import firestore from '@react-native-firebase/firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import {DateTimePickerAndroid} from '@react-native-community/datetimepicker';
import {firebase} from '@react-native-firebase/firestore';
import uuid from 'react-native-uuid';
import {Alarm} from '../Alarm';
import {SafeAreaView} from 'react-native-safe-area-context';
import { cancelScheduledNotification, scheduleNotification } from '../AlarmNotification';

const AlarmScreen = props => {
  const [isModalVisible, setIsModalVisible] = useState(false); //state that allows the modal to pop up and disappear upon button presses
  const [name, setName] = useState('');
  const [days, changeDays] = useState({
    0: 0, //cr: descriptive names of week
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
  });
  const [btnColor, changeBtnColor] = useState({
    0: COLORS.naplesYellow,
    1: COLORS.naplesYellow,
    2: COLORS.naplesYellow,
    3: COLORS.naplesYellow,
    4: COLORS.naplesYellow,
    5: COLORS.naplesYellow,
    6: COLORS.naplesYellow,
  });

  const handleModal = () => {
    //cr: reset modal explanation
    setIsModalVisible(() => !isModalVisible);
    setName('');
    setDate(new Date(Date.now()));
    setTime(new Date(Date.now()));
    for (let index = 0; index < 7; index++) {
      days[index] = 0;
      btnColor[index] = COLORS.naplesYellow;
    }
  };
  const uid = firebase.auth().currentUser.uid;
  const [alarms, setAlarms] = useState({});

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
    const timePass = time.toLocaleTimeString(
      [],
      {hour: '2-digit', minute: '2-digit'},
      'en-US',
    );
    createAlarm(alarmID, timePass);
    handleModal();
  };

  const buttonHandle = day => {
    //cr: possible name change
    const toChangeDay = day;
    const val = days[toChangeDay] == 0 ? 1 : 0;
    const col = val == 0 ? COLORS.naplesYellow : COLORS.opal;
    changeDays({...days, [toChangeDay]: val});
    changeBtnColor({...btnColor, [toChangeDay]: col});
  };

  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date(Date.now()));

  const onChangeDate = (event, selectedDate) => {
    const currentDate = selectedDate;
    setDate(currentDate);
  };

  const onChangeTime = (event, selectedTime) => {
    const currentTime = selectedTime;
    setTime(currentTime);
  };

  const showMode = currentMode => {
    DateTimePickerAndroid.open({
      value: date,
      mode: currentMode,
      display: 'spinner',
      is24Hour: false,
    });
  };

  const showDatePicker = () => {
    //cr: possible logic change
    if (Platform.OS == 'android') {
      showMode('date');
    }
  };

  const showTimePicker = () => {
    if (Platform.OS == 'android') {
      showMode('time');
    }
  };

  //begin ojas alarm code

  const createAlarm = (key, time) => {
    console.log(key);
    newAlarms = {...alarms};
    newAlarms[key] = {time: time, active: true};
    setAlarms(newAlarms);
  };

  const toggleAlarm = key => {
    if (!alarms[key].active == true) {
      scheduleNotification(key, alarms[key].time);
    }
    else {
      cancelScheduledNotification(key);
    }
    newAlarms = {...alarms};
    newAlarms[key] = {time: alarms[key].time, active: !alarms[key].active};
    setAlarms(newAlarms);
    firestore()
      .collection('Users')
      .doc(uid)
      .collection('Alarms')
      .doc(key)
      .update({turnedOn: !alarms[key].active});
  };

  const buildAlarms = () => {
    let alarmComponents = [];
    if (Object.keys(alarms).length == 0) {
      setAlarms(props.alarmsArray);
      for (let key in props.alarmsArray) {
        alarmComponents.push(
          <Alarm
            key={key}
            toggle={toggleAlarm}
            alarmId={key}
            data={props.alarmsArray[key]}
          />,
        );
      }
      return alarmComponents;
    } else {
      for (let key in alarms) {
        alarmComponents.push(
          <Alarm
            key={key}
            toggle={toggleAlarm}
            alarmId={key}
            data={alarms[key]}
          />,
        );
      }
      return alarmComponents;
    }
  };

  return (
    <SafeAreaView style={style.container}>
      <View
        style={{
          justifyContent: 'space-between',
          flexDirection: 'row',
          alignItems: 'center',
          alignContent: 'center',
          paddingLeft: 22,
        }}>
        <Text style={style.font}>Your Alarms</Text>
        <ReusableButton //create new alarm button, customizable
          title="+"
          width="15%"
          fontSize={30}
          color={COLORS.indigoDye}
          backgroundColor={COLORS.naplesYellow}
          onPress={handleModal}></ReusableButton>
      </View>
      <ScrollView contentContainerStyle={{flexGrow: 1}}>
        {buildAlarms()}
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
                  onPress={() => buttonHandle(0)}
                  backgroundColor={btnColor[0]}
                  color={COLORS.indigoDye}
                  title="Su"
                  width="12%"
                />
                <ReusableButton
                  onPress={() => buttonHandle(1)}
                  backgroundColor={btnColor[1]}
                  color={COLORS.indigoDye}
                  title="M"
                  width="12%"
                />
                <ReusableButton
                  onPress={() => buttonHandle(2)}
                  backgroundColor={btnColor[2]}
                  color={COLORS.indigoDye}
                  title="Tu"
                  width="12%"
                />
                <ReusableButton
                  onPress={() => buttonHandle(3)}
                  backgroundColor={btnColor[3]}
                  color={COLORS.indigoDye}
                  title="W"
                  width="12%"
                />
                <ReusableButton
                  onPress={() => buttonHandle(4)}
                  backgroundColor={btnColor[4]}
                  color={COLORS.indigoDye}
                  title="Th"
                  width="12%"
                />
                <ReusableButton
                  onPress={() => buttonHandle(5)}
                  backgroundColor={btnColor[5]}
                  color={COLORS.indigoDye}
                  title="F"
                  width="12%"
                />
                <ReusableButton
                  onPress={() => buttonHandle(6)}
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
      </ScrollView>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.naplesYellow,
    paddingBottom: 60,
  },
  font: {
    paddingTop: 13,
    fontSize: 25,
    color: COLORS.indigoDye,
  },
  noAlarm: {
    fontSize: 20,
    flex: 1,
    color: COLORS.indigoDye,
    textAlign: 'center',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
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
  buttonText: {
    fontWeight: '500',
    fontSize: 16,
    color: COLORS.lemonChiffon,
  },
});

export default AlarmScreen;
