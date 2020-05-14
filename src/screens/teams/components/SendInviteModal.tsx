import React, {useState, useContext} from 'react';
import {View, StyleSheet} from 'react-native';
import {ModalConfirm, Text} from 'src/components/common';
import colors from 'src/static/colors';
import {TextInput, HelperText} from 'react-native-paper';
import {isEmail} from 'src/static/functions';
import {ApplicationContext} from 'src/context/ApplicationContext';
import Team from 'src/models/Team';

interface SendInviteModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  team: Team;
}

const SendInviteModal: React.FC<SendInviteModalProps> = ({
  modalVisible,
  setModalVisible,
  team,
}) => {
  const {
    actions: {firebase, setters},
    profile,
  } = useContext(ApplicationContext);
  const [input, setInput] = useState<string>('');
  const [errorVisible, setErrorVisible] = useState<boolean>(false);
  return (
    <ModalConfirm
      visible={modalVisible}
      onRequestClose={() => setModalVisible(false)}
      onAccept={async () => {
        if (isEmail(input)) {
          setErrorVisible(false);
          try {
            await firebase.sendInviteForTeam(
              team,
              input,
              `${profile!.firstName} ${profile!.lastName}`,
            );
          } catch (error) {}
        }
        setErrorVisible(true);
        return;
      }}
      texts={{
        acceptBtn: 'Send invite',
        declineBtn: 'Cancel',
      }}
      colors={{
        acceptBtn: colors.darkerBasicBlue,
        background: '#fff',
        btnText: '#FFF',
        declineBtn: colors.redHighlight,
      }}>
      <View style={styles().modalTextBox}>
        <Text.Title>Send invite</Text.Title>
        <Text.Caption style={{textAlign: 'center'}}>
          Enter the mail of a person you would like to join your team
        </Text.Caption>
        <TextInput
          style={{width: '100%', height: 40}}
          value={input}
          onChangeText={setInput}
        />
        <HelperText type="error" visable={errorVisible} />
      </View>
    </ModalConfirm>
  );
};

const styles = () =>
  StyleSheet.create({
    modalTextBox: {
      alignItems: 'center',
    },
  });

export default SendInviteModal;
