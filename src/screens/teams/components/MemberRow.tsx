import React, {useContext} from 'react';
import TeamMember from 'src/models/TeamMember';
import {DataTable} from 'react-native-paper';
import {getWrittenPosition} from 'src/static/functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {TouchableIcon} from 'src/components/common';
import {TouchableOpacity, Text} from 'react-native';

const MemberRow: React.FC<{
  member: TeamMember;
  premissionLevel: number;
  personalPremissionLevel: number;
  setChosenMember: React.Dispatch<React.SetStateAction<TeamMember | undefined>>;
}> = ({member, premissionLevel, personalPremissionLevel, setChosenMember}) => {
  const {profile} = useContext(ApplicationContext);

  const showEdit =
    personalPremissionLevel > 3 &&
    premissionLevel <= personalPremissionLevel &&
    profile!.uuid !== member.uuid;
  const onPress = showEdit ? () => setChosenMember(member) : undefined;
  return (
    <DataTable.Row>
      <DataTable.Cell>{member.name}</DataTable.Cell>
      <DataTable.Cell>{getWrittenPosition(member.position)}</DataTable.Cell>
      <DataTable.Cell numeric>{member.positonValue}</DataTable.Cell>
      <DataTable.Cell
        onPress={onPress}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        {showEdit ? <Icon name="pencil" /> : <Text> </Text>}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default MemberRow;
