import React, {useState, useContext, useCallback} from 'react';
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
  const [errorMsg, setErrorMsg] = useState<string>(
    'Email has to be correct and not belong to another team member.',
  );
  const [loading, setLoading] = useState<boolean>(false);

  const isNotTeamMember = useCallback((team: Team, mail: string) => {
    console.log(!team.members.some(member => member.mail === mail));

    return !team.members.some(member => member.mail === mail);
  }, []);
  return (
    <ModalConfirm
      visible={modalVisible}
      loading={loading}
      onRequestClose={() => setModalVisible(false)}
      onAccept={async () => {
        if (isEmail(input) && isNotTeamMember(team, input)) {
          setErrorVisible(false);
          setLoading(true);
          try {
            await firebase.sendInviteForTeam(
              team,
              input,
              `${profile!.firstName} ${profile!.lastName}`,
            );
            setModalVisible(false);
            setLoading(false);
          } catch (error) {
            setErrorMsg('Error ocurred whilst sending invite.');

            setLoading(false);
          }
        } else {
          setErrorMsg(
            'Email has to be correct and not belong to another team member.',
          );
          setErrorVisible(true);
          setLoading(false);
        }
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
          onChangeText={value => {
            if (errorVisible) setErrorVisible(false);
            setInput(value);
          }}
        />
        {errorVisible && (
          <HelperText type="error" visable={errorVisible}>
            {errorMsg}
          </HelperText>
        )}
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
