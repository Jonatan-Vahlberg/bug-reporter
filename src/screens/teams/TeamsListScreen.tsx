import * as React from 'react';
import {Navbar} from '../../components/common';
import {View, Button} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import NavSubBar from './components/NavSubBar';

export interface ListProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

export interface ListState {}

const TeamsListScreen: React.FC<ListProps> = ({navigation, route}) => {
  return (
    <View>
      <Navbar title="Teams" root navigation={navigation} />
      <NavSubBar navigation={navigation} position="LIST" />
      <Button
        title="Create"
        onPress={() => navigation.navigate('TEAMS_CREATE')}
      />
      <Button
        title="view"
        onPress={() => navigation.navigate('TEAMS_DETAIL')}
      />
      <Button
        title="admin"
        onPress={() => navigation.navigate('TEAMS_ADMIN')}
      />
    </View>
  );
};

export default TeamsListScreen;
