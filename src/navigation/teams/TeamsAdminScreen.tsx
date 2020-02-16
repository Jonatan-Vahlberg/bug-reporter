import * as React from 'react';
import Team from '../../models/Team';
import {Navbar} from '../../components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '..';
import {RouteProp} from '@react-navigation/native';

export interface AdminProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_ADMIN'>;
}

export interface AdminState {}

class TeamsAdminScreen extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
    this.state = {};
  }
  render() {
    return null;
  }
}

export default TeamsAdminScreen;
