/*
Customizable modal that allows for us to have a pop-up whenever 
we'd like for the user to input information, or any other use we'd have for a modal
It also has different parts to it just like html, (i.e. header, body, footer, etc.)
*/
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../assets/colors';
import ReactNativeModal from 'react-native-modal';
import {Dimensions} from 'react-native';

type ModalProps = {
  isVisible: Boolean,
  children: React.ReactNode,
  [x: string]: any,
};

export const ReusableModal = ({
  isVisible = false,
  children,
  ...props
}: ModalProps) => {
  return (
    <ReactNativeModal
      isVisible={isVisible}
      animationInTiming={500}
      animationOutTiming={500}
      {...props}>
      {children}
    </ReactNativeModal>
  );
};

const ModalContainer = ({children}: {children: React.ReactNode}) => (
  <View style={style.container}>{children}</View>
);

const ModalHeader = ({title}: {title: string}) => (
  <View style={style.header}>
    <Text style={style.text}>{title}</Text>
  </View>
);

const ModalBody = ({children}: {children?: React.ReactNode}) => (
  <View style={style.body}>{children}</View>
);

const ModalFooter = ({children}: {children?: React.ReactNode}) => (
  <View style={style.footer}>{children}</View>
);

const style = StyleSheet.create({
  container: {
    backgroundColor: COLORS.indigoDye,
    borderRadius: 25,
  },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    paddingTop: 10,
    textAlign: 'center',
    fontSize: 24,
    color: COLORS.lemonChiffon,
  },
  body: {
    justifyContent: 'center',
    paddingHorizontal: 15,
    minHeight: 100,
  },
  footer: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    flexDirection: 'row',
  },
});

ReusableModal.Header = ModalHeader;
ReusableModal.Container = ModalContainer;
ReusableModal.Body = ModalBody;
ReusableModal.Footer = ModalFooter;
