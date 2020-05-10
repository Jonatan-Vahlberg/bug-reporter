import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {ProfileParamList} from 'src/navigation';
import SettingsItem, {SettingsProps} from './SettingsItem';
import {View, Text} from 'react-native';

type Props = {
  navigation: StackNavigationProp<ProfileParamList, 'PROFILE_HOME'>;
};

const SettingsList: React.FC<Props> = ({navigation}) => {
  const settingsItems: SettingsProps[] = [
    {name: 'Notifications', iconName: 'bell', onPress: () => {}},
    {name: 'Clear cache', iconName: 'cached', onPress: () => {}},
    {name: 'Log out', iconName: 'logout-variant', onPress: () => {}},
  ];

  return (
    <View>
      <Text>Hello</Text>
      {settingsItems.map(item => (
        <SettingsItem key={item.name} {...item} />
      ))}
    </View>
  );
};

export default SettingsList;
