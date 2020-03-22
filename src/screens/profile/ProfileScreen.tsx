import * as React from 'react';
import Team from '../../models/Team';
import {Navbar, ScreenComponent} from '../../components/common';
import {View, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';

export interface ProfileProps {
  navigation: StackNavigationProp<ProfileParamList>;
  route: RouteProp<ProfileParamList, 'PROFILE_HOME'>;
}

export interface ProfileState {}

class ProfileScreen extends React.Component<ProfileProps, ProfileState> {
  constructor(props: ProfileProps) {
    super(props);

    this.state = {};
  }
  render() {
    return (
      <ScreenComponent>
        <Button title="Log out" onPress={() => {}} />
      </ScreenComponent>
    );
  }
}

export default ProfileScreen;
