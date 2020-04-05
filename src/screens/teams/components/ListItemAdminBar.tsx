import React, {useContext, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from 'src/navigation';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/static/colors';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {LightTeam} from 'src/models/Team';
import SelectTeamModal from './SelectTeamModal';

const ListItemAdminBar: React.FC<{
  team: LightTeam;
  navigation: StackNavigationProp<TeamsParamList>;
}> = (props) => {
  const {settings, actions} = useContext(ApplicationContext);
  const {
    navigation,
    team: {uuid, personalPositionValue},
  } = props;
  const [visible, setVisible] = useState<boolean>(false);

  return (
    <>
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => setVisible(true)}
          disabled={settings.feautredTeamId !== uuid}>
          <Icon
            name={settings.feautredTeamId === uuid ? 'star' : 'star-outline'}
            size={25}
            style={styles.icon}
            color={colors.darkerBasicBlue}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('TEAMS_DETAIL', {teamBase: props.team})
          }>
          <Icon
            name={personalPositionValue >= 4 ? 'pen' : 'eye'}
            size={25}
            style={styles.icon}
            color={colors.darkerBasicBlue}
          />
        </TouchableOpacity>
      </View>
      <SelectTeamModal
        onAccept={() => {}}
        team={props.team}
        navigation={navigation}
        visible={visible}
        setvisible={setVisible}
      />
    </>
  );
};

const styles = StyleSheet.create({
  bar: {
    paddingVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  icon: {
    padding: 10,
  },
});

export default ListItemAdminBar;
