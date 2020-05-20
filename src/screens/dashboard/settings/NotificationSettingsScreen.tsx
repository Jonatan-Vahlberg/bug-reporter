import * as React from 'react';
import Team from 'src/models/Team';
import {Navbar, ScreenComponent} from 'src/components/common';
import {
  View,
  Button,
  SectionList,
  SectionListData,
  Text,
  StyleSheet,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileParamList, DashboardParamList} from 'src/navigation';
import {RouteProp} from '@react-navigation/native';
import SettingsList from './components/SettingsList';
import {ApplicationContext} from 'src/context/ApplicationContext';
import NotificationSettingsItem from './components/NotificationSettingsItem';

export interface SettingsProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'SETTINGS'>;
}

export type NotificationProps = {
  name: string;
  value: boolean;
  base: 'other' | 'featured';
  signedKey: 'all' | 'mentions';
};

const NotificationSettingsScreen: React.FC<SettingsProps> = props => {
  const {
    settings: {notifications},
  } = React.useContext(ApplicationContext);
  const sections: SectionListData<unknown>[] = [
    {
      data: [
        {
          name: 'All',
          value: notifications.featuredTeam.all,
          base: 'featured',
          signedKey: 'all',
        },
        {
          name: 'Mentions',
          value: notifications.featuredTeam.mentions,
          base: 'featured',

          signedKey: 'mentions',
        },
      ],
      name: 'Featured Team',
      key: 'ac1',
    },
    {
      data: [
        {
          name: 'Invites',
          value: notifications.otherTeams.invites,
          base: 'other',
          signedKey: 'invites',
        },
        {
          name: 'Mentions',
          value: notifications.otherTeams.mentions,
          base: 'other',

          signedKey: 'mentions',
        },
      ],
      name: 'Other teams',
      key: 'ac2',
    },
  ];

  return (
    <ScreenComponent>
      <Navbar
        title="Notifications"
        navigation={props.navigation}
        root={false}
      />
      <SectionList
        sections={sections}
        renderSectionHeader={section => {
          return (
            <View style={Styles.sectionHead}>
              <Text style={Styles.sectionName}>{section.section.name}</Text>
            </View>
          );
        }}
        //@ts-ignore
        renderItem={item => <NotificationSettingsItem {...item.item} />}
      />
    </ScreenComponent>
  );
};

const Styles = StyleSheet.create({
  sectionHead: {
    marginHorizontal: 5,
    borderBottomColor: 'black',
    borderBottomWidth: 1.1,
  },
  sectionName: {
    fontSize: 20,
    fontWeight: '800',
  },
});

export default NotificationSettingsScreen;
