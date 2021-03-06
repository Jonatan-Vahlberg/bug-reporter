import React from 'react';
import {View, Modal, TouchableOpacity, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';

import colors from '../../static/colors';

type ModalColors = {
  background: string;
  acceptBtn: string;
  declineBtn: string;
  btnText: string;
};

interface ModalConfirmProps {
  onRequestClose: Function;
  onAccept: Function;
  texts: {acceptBtn: string; declineBtn: string};
  visible?: boolean;
  transparent?: boolean;
  colors?: ModalColors;
  loading?: boolean
}

const ModalConfirm: React.FC<ModalConfirmProps> = ({
  children,
  onRequestClose,
  onAccept,
  visible,
  colors: modalColors,
  transparent,
  texts,
  loading
}) => {
  const {
    container,
    buttonStyle,
    buttonView,
    buttonSubView,
    btnTextStyle,
    outsideContainer,
  } = generateStyles(modalColors!);
  console.log(modalColors?.acceptBtn);
  const onAcceptColor = modalColors?.acceptBtn
  return (
    <Modal
      onRequestClose={() => onRequestClose()}
      visible={visible}
      transparent={transparent}>
      <View style={outsideContainer}>
        <View style={container}>
          <ScrollView>{children}</ScrollView>
                {loading && <ActivityIndicator style={{alignSelf: "center", marginTop: 10, marginBottom: 0}}/>}
          <View style={buttonView}>
            <View style={buttonSubView}>
              <TouchableOpacity onPress={() => onAccept()} disabled={loading}>
                <View
                  style={[buttonStyle, {backgroundColor: modalColors?.acceptBtn}]}>
                  <Text style={btnTextStyle}>{texts.acceptBtn}</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={buttonSubView}>
              <TouchableOpacity onPress={() => onRequestClose()} disabled={loading}>
                <View
                  style={[buttonStyle, {backgroundColor: modalColors!.declineBtn}]}>
                  <Text style={btnTextStyle}>{texts.declineBtn}</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

ModalConfirm.defaultProps = {
  colors: {
    acceptBtn: colors.darkerBasicBlue,
    declineBtn: colors.redHighlight,
    background: 'white',
    btnText: 'white',
  },
};

const generateStyles = (colors: ModalColors) => {
  return StyleSheet.create({
    outsideContainer: {
      backgroundColor: '#00000050',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    container: {
      justifyContent: 'center',
      paddingHorizontal: 10,
      paddingVertical: 15,
      alignSelf: 'center',
      alignContent: 'center',
      width: '80%',
      maxHeight: '60%',
      minHeight: '10%',
      borderRadius: 10,
      backgroundColor: colors.background,
    },
    buttonStyle: {
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      borderRadius: 10,
    },
    buttonView: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'flex-end',
      marginTop: 20,
    },
    buttonSubView: {
      flex: 1,
      paddingHorizontal: 5,
    },
    btnTextStyle: {
      color: colors.btnText,
      fontSize: 20,
      fontWeight: '700',
    },
  });
};

ModalConfirm.defaultProps = {
  onRequestClose: () => {},
  onAccept: () => {},
  visible: false,
  transparent: true,
  colors: {
    background: '#fff',
    acceptBtn: colors.greenHighlight,
    declineBtn: colors.redHighlight,
    btnText: '#fff',
  },
  texts: {acceptBtn: 'Ok', declineBtn: 'Decline'},
};

export {ModalConfirm};
