import * as React from 'react';
import Team from '../../models/Team';
import {Navbar} from '../../components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '..';
import {RouteProp} from '@react-navigation/native';

export interface DetailProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_DETAIL'>;
}

export interface DetailState {}

class TeamDetailScreen extends React.Component<DetailProps, DetailState> {
  constructor(props: DetailProps) {
    super(props);
    this.state = {};
  }
  render() {
    return null;
  }
}

export default TeamDetailScreen;
