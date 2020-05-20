import React, {useState, useContext} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {ModalConfirm, Text} from 'src/components/common';
import TeamMember, {TeamPosition} from 'src/models/TeamMember';
import Picker from 'react-native-picker-select';
import {getWrittenPosition} from 'src/static/functions';
import colors from 'src/static/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ApplicationContext} from 'src/context/ApplicationContext';

interface MemberModalProps {
  teamMember: TeamMember;
  teamUuid: string;
  visible: boolean;
  setTeamMember: React.Dispatch<React.SetStateAction<TeamMember | undefined>>;
  setUpdateMade: React.Dispatch<React.SetStateAction<boolean>>;
}

const MemberModal: React.FC<MemberModalProps> = ({
  teamMember,
  teamUuid,
  visible,
  setTeamMember,
  setUpdateMade,
}) => {
  const {actions} = useContext(ApplicationContext);
  const [pickerValue, setPickerValue] = useState<number>(
    getRightValueForPicker(teamMember.position),
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [toBeDeleted, setToBeDeleted] = useState<boolean>(false);
  return (
    <ModalConfirm
      onAccept={async () => {
        if (toBeDeleted) {
          await actions.firebase.leaveTeam(teamUuid, teamMember.uuid);
        } else {
          await actions.firebase.changeMembersPosition(
            teamUuid,
            teamMember,
            getPositionBasedOnPickerValue(pickerValue),
          );
        }
        setTeamMember(undefined);
        setUpdateMade(true);
      }}
      onRequestClose={() => setTeamMember(undefined)}
      texts={{
        acceptBtn: toBeDeleted ? 'Remove' : 'Save',
        declineBtn: 'Cancel',
      }}
      colors={{
        acceptBtn: colors.darkerBasicBlue,
        background: '#fff',
        btnText: '#FFF',
        declineBtn: colors.redHighlight,
      }}
      visible={visible}>
      <Text.Base>{teamMember.name}</Text.Base>
      <Text.Base style={{marginBottom: 20}}>
        Current position: {getWrittenPosition(teamMember.position)}
      </Text.Base>
      <View style={styles.adminContainer}>
        <View style={{flex: 1}}>
          <Text.Caption>Change position</Text.Caption>
          <Picker
            onValueChange={value => {
              setPickerValue(value);
            }}
            value={pickerValue}
            items={[
              {label: getWrittenPosition('OTHER'), value: 1},
              {label: getWrittenPosition('DEVELOPER'), value: 2},
              {label: getWrittenPosition('TESTER'), value: 3},
              {label: getWrittenPosition('CONSULTANT'), value: 4},
              {label: getWrittenPosition('TECH_LEAD'), value: 5},
            ]}
          />
        </View>
        <TouchableOpacity onPress={() => setToBeDeleted(!toBeDeleted)}>
          <Icon
            style={styles.iconContainer}
            name="delete"
            size={35}
            color={toBeDeleted ? colors.redHighlight : colors.greyDetail}
          />
        </TouchableOpacity>
      </View>
    </ModalConfirm>
  );
};

const getRightValueForPicker = (position: TeamPosition) => {
  switch (position) {
    case 'OTHER':
      return 1;
    case 'DEVELOPER':
      return 2;
    case 'TESTER':
      return 3;
    case 'CONSULTANT':
      return 4;
    case 'TECH_LEAD':
      return 5;
    default:
      return 1;
  }
};

const getPositionBasedOnPickerValue = (
  value: number,
): {value: number; position: TeamPosition} => {
  switch (value) {
    case 1:
      return {value: 1, position: 'OTHER'};
    case 2:
      return {value: 3, position: 'DEVELOPER'};
    case 3:
      return {value: 3, position: 'TESTER'};
    case 4:
      return {value: 3, position: 'CONSULTANT'};
    case 5:
      return {value: 4, position: 'TECH_LEAD'};
    default:
      return {value: 1, position: 'OTHER'};
  }
};

const styles = StyleSheet.create({
  adminContainer: {
    flexDirection: 'row',
    marginBottom: 10,
    width: '100%',
    justifyContent: 'space-between',
    alignContent: 'center',
    flex: 1,
  },
  iconContainer: {
    marginLeft: 10,
    padding: 10,
    alignSelf: 'center',
  },
});

export default MemberModal;
