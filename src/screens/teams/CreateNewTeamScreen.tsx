import React, {useState, useCallback, useContext} from 'react';
import {Navbar, Text} from '../../components/common';
import {View, StyleSheet, TextInput} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {Button, Card, Switch} from 'react-native-paper';
import colors from 'src/static/colors';
import {ScrollView} from 'react-native-gesture-handler';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {firebaseDBErrorStatus} from 'src/services/api/firebase';
import Profile from 'src/models/Profile';

export interface AdminProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

const CreateNewTeamScreen: React.FC<AdminProps> = ({navigation, route}) => {
  const {actions, profile} = useContext(ApplicationContext);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const isSubmitable = name !== '' && description !== '';
  const [publicTeam, setPublic] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      const result = await actions.firebase.createTeam(
        name,
        description,
        publicTeam,
        profile!,
      );
      setLoading(false);
      if (result.error === firebaseDBErrorStatus.NO_ERROR) {
        const updatedTeams: string[] = [...profile!.teams, result.payload!];
        const updatedProfile: Profile = {...profile!, teams: updatedTeams};
        actions.setters.setProfile!(updatedProfile);
        navigation.goBack();
      }
    } catch (error) {
      console.warn(error);
    }
  }, [name, description, publicTeam, setLoading, navigation]);
  return (
    <View style={{height: '100%'}}>
      <Navbar title="Teams: create New" root={false} navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <Card style={styles.card}>
          <Card.Title title="Team name*" />
          <TextInput
            value={name}
            onChangeText={setName}
            style={styles.input}
            placeholder="name of the team"
          />
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Team description*" />
          <TextInput
            value={description}
            onChangeText={setDescription}
            style={styles.input}
            placeholder="description of the team and it purpose"
            numberOfLines={8}
            multiline
          />
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Team Options*" />
          <View style={styles.content}>
            <View style={{flexDirection: 'row'}}>
              <Text.Base>Is company public?</Text.Base>
              <Switch value={publicTeam} onValueChange={setPublic} />
            </View>
          </View>
        </Card>
      </ScrollView>
      <Button
        loading={loading}
        onPress={handleSubmit}
        disabled={!isSubmitable}
        style={styles.button}
        color="#fff">
        Create
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 10,
    paddingVertical: 10,
    marginTop: 20,
  },
  input: {
    paddingHorizontal: 20,
    textAlignVertical: 'top',
  },
  button: {
    marginHorizontal: 20,
    borderRadius: 10000,
    backgroundColor: colors.darkerBasicBlue,
    marginTop: 20,
    marginBottom: 20,
  },
  content: {
    paddingHorizontal: 20,
  },
});

export default CreateNewTeamScreen;
