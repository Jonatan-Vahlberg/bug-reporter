import React, {useState} from 'react';
import {Navbar, Text} from '../../components/common';
import {View, StyleSheet, TextInput} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {Button, Card, Switch} from 'react-native-paper';
import colors from 'src/static/colors';
import {ScrollView} from 'react-native-gesture-handler';

export interface AdminProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

const CreateNewTeamScreen: React.FC<AdminProps> = ({navigation, route}) => {
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [publicTeam, setPublic] = useState<boolean>(false);
  return (
    <View style={{height: '100%'}}>
      <Navbar title="Teams: create New" root={false} navigation={navigation} />
      <ScrollView style={{flex: 1}}>
        <Card style={styles.card}>
          <Card.Title title="Team name*" />
          <TextInput style={styles.input} placeholder="name of the team" />
        </Card>
        <Card style={styles.card}>
          <Card.Title title="Team description*" />
          <TextInput
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
            <Text.Base>Roles</Text.Base>
          </View>
        </Card>
      </ScrollView>
      <Button style={styles.button} color="#fff">
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
