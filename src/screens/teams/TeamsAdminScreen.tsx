import React, {useState, useContext, useCallback} from 'react';
import {Navbar} from '../../components/common';
import {View, StyleSheet, Alert} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import NavSubBar from './components/NavSubBar';
import InputBox from './components/InputBox';
import {Button, Card} from 'react-native-paper';
import colors from 'src/static/colors';
import {ApplicationContext} from 'src/context/ApplicationContext';

export interface AdminProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

const TeamsAdminScreen: React.FC<AdminProps> = ({navigation, route}) => {
  const {actions, profile} = useContext(ApplicationContext);
  const [code, setCode] = useState<string>('');

  return (
    <View>
      <Navbar title="Teams: admin" root navigation={navigation} />
      <NavSubBar navigation={navigation} position="ADMIN" />
      <Card style={styles.card}>
        <Card.Title title="Join a team" />
        <InputBox onCodeSet={setCode} />
        <Button
          onPress={async () => {
            const result = await actions.firebase.getTeamWithCode(
              code,
              profile!,
              actions.firebase.joinTeam,
            );
            if (result) {
              const {name, uuid} = result;
              actions.setters.setProfile!({
                ...profile!,
                teams: [
                  ...profile!.teams,
                  {
                    name,
                    uuid,
                    personalPosition: 'OTHER',
                    personalPositionValue: 1,
                  },
                ],
              });
            }
            console.log(result);
          }}
          color={'#fff'}
          style={styles.button}
          disabled={code.length !== 6}>
          Join Team
        </Button>
      </Card>
      <Card style={styles.card}>
        <Card.Title title="Create a new team" />
        <Button
          onPress={() => navigation.navigate('TEAMS_CREATE')}
          color={'#fff'}
          style={styles.button}>
          Create Team
        </Button>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
  },

  button: {
    marginHorizontal: 20,
    borderRadius: 10000,
    backgroundColor: colors.darkerBasicBlue,
    marginTop: 20,
  },
});

export default TeamsAdminScreen;
