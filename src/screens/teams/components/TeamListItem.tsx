import React from 'react';
import {LightTeam} from 'src/models/Team';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from 'src/navigation';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from 'src/components/common';
import {Card} from 'react-native-paper';
import {getWrittenPosition} from 'src/static/functions';
import ListItemAdminBar from './ListItemAdminBar';

const TeamListItem: React.FC<{
  team: LightTeam;
  navigation: StackNavigationProp<TeamsParamList>;
}> = (props) => {
  const {
    team: {name, personalPosition, personalPositionValue, uuid},
    navigation,
  } = props;

  return (
    <Card style={styles.card}>
      <View>
        <Text.Title>{name}</Text.Title>
        <Text.Base>Position: {getWrittenPosition(personalPosition)}</Text.Base>
      </View>
      <ListItemAdminBar team={props.team} navigation={navigation} />
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 20,
    marginVertical: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

export default TeamListItem;
