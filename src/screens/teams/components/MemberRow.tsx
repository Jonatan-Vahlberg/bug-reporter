import React, {useContext} from 'react';
import TeamMember from 'src/models/TeamMember';
import {DataTable} from 'react-native-paper';
import {getWrittenPosition} from 'src/static/functions';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ApplicationContext} from 'src/context/ApplicationContext';

const MemberRow: React.FC<{
  member: TeamMember;
  premissionLevel: number;
  personalPremissionLevel: number;
}> = ({member, premissionLevel, personalPremissionLevel}) => {
  const {profile} = useContext(ApplicationContext);
  return (
    <DataTable.Row>
      <DataTable.Cell>{member.name}</DataTable.Cell>
      <DataTable.Cell>{getWrittenPosition(member.position)}</DataTable.Cell>
      <DataTable.Cell numeric>{member.positonValue}</DataTable.Cell>
      <DataTable.Cell numeric>
        {personalPremissionLevel > 3 && profile!.uuid !== member.uuid && (
          <Icon name="close-circle" />
        )}
      </DataTable.Cell>
    </DataTable.Row>
  );
};

export default MemberRow;
