import * as React from 'react';
import {Navbar} from '../../components/common';
import {View, Button} from 'react-native';
import NavigationPaths from '../NavigationPaths';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '..';
import {RouteProp} from '@react-navigation/native';

export interface ListProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

export interface ListState {}

class TeamsListScreen extends React.Component<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View>
        <Button
          title="Create"
          onPress={() => this.props.navigation.navigate('TEAMS_CREATE')}
        />
        <Button
          title="view"
          onPress={() => this.props.navigation.navigate('TEAMS_DETAIL')}
        />
        <Button
          title="admin"
          onPress={() => this.props.navigation.navigate('TEAMS_ADMIN')}
        />
      </View>
    );
  }
}

export default TeamsListScreen;
