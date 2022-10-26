import React, {useState} from 'react';
import {View, Text} from 'react-native';
import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/colors';
import {ReusableButton} from '../ReusableButton';
import {ReusableModal} from '../ReusableModal';

const AlarmScreen = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

  return (
    <View style={style.container}>
      <Text style={style.font}>Your Alarms</Text>
      <ReusableButton
        title="Create new alarm"
        onPress={handleModal}></ReusableButton>
      <ReusableModal isVisible={isModalVisible}>
        <ReusableModal.Container>
          <ReusableModal.Header title="Create Alarm" />
          <ReusableModal.Body>
            <Text style={{fontSize: 20, color: COLORS.lemonChiffon}}>Time</Text>
          </ReusableModal.Body>
          <ReusableModal.Footer>
            <ReusableButton
              title="Create"
              color={COLORS.indigoDye}
              backgroundColor={COLORS.naplesYellow}
              width="50%"></ReusableButton>
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
});

export default AlarmScreen;
