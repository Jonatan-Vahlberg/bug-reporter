import React, {useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import SettingsItem, {SettingsProps} from './SettingsItem';
import {View, Text} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';

type Props = {
  navigation: StackNavigationProp<DashboardParamList>;
};

const SettingsList: React.FC<Props> = ({navigation}) => {
  const {actions, settings, profile} = useContext(ApplicationContext);
  const settingsItems: SettingsProps[] = [
    {
      name: 'Notifications',
      iconName: 'bell',
      onPress: () => navigation.navigate('SETTINGS_NOTIFICATIONS'),
    },

    {
      name: 'Log out',
      iconName: 'logout-variant',
      onPress: async () => {
        await actions.firebase.logout(profile!);

        actions.setters.setFeaturedReports!([]);
        actions.setters.setFeaturedTeam!(undefined);
        actions.setters.setNotifications!([]);
        actions.setters.setProfile!(undefined);
        //@ts-ignore
        await actions.storage.setSettings({
          ...settings,
          feautredTeamId: 'UNSET',
        });
      },
    },
  ];

  return (
    <View>
      {settingsItems.map(item => (
        <SettingsItem key={item.name} {...item} />
      ))}
    </View>
  );
};

// UNUSED SETTING{name: 'Clear cache', iconName: 'cached', onPress: () => {}},

export default SettingsList;
