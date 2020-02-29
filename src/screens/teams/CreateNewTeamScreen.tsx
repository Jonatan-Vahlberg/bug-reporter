import * as React from 'react';
import Team from '../../models/Team';
import TeamMember from '../../models/TeamMember';
import {Navbar} from '../../components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';

export interface AdminProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_HOME'>;
}

export interface AdminState {
  name: string;
  description: string;
  teamMembers?: TeamMember[];
  update?: boolean;
  team?: Team;
}

class CreateNewTeamScreen extends React.Component<AdminProps, AdminState> {
  constructor(props: AdminProps) {
    super(props);
    const {navigation, route} = this.props;
    const update: boolean = false;
    //const team?: Team = undefined
    if (update) {
      this.state = {
        name: 'team.name',
        description: 'team.description',
        teamMembers: [],
        update,
        team: undefined,
      };
    } else {
      this.state = {
        name: '',
        description: '',
        teamMembers: [],
      };
    }
  }
  render() {
    return null;
  }
}

export default CreateNewTeamScreen;
