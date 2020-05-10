import * as React from 'react';
import Team from 'src/models/Team';
import {Navbar, ScreenComponent} from 'src/components/common';
import {View, Button} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileParamList, DashboardParamList} from 'src/navigation';
import {RouteProp} from '@react-navigation/native';
import SettingsList from './components/SettingsList';

export interface SettingsProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'SETTINGS'>;
}

const SettingsScreen: React.FC<SettingsProps> = props => {
  return (
    <ScreenComponent>
      <Navbar title="Settings" navigation={props.navigation} root={false} />
      <SettingsList navigation={props.navigation} />
    </ScreenComponent>
  );
};

export default SettingsScreen;
