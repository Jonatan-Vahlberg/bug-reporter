import * as React from 'react';
import {Navbar} from '../../components/common';
import {View, Button} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import NavSubBar from './components/NavSubBar';
import {Text} from 'src/components/common/Text';
import {ApplicationContext} from 'src/context/ApplicationContext';

export interface ListProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

export interface ListState {}

const TeamsListScreen: React.FC<ListProps> = ({navigation, route}) => {
  const {profile} = React.useContext(ApplicationContext);
  return (
    <View>
      <Navbar title="List of teams" root navigation={navigation} />
      <NavSubBar navigation={navigation} position="LIST" />
    </View>
  );
};

export default TeamsListScreen;
