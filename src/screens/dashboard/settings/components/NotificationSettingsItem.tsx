import * as React from 'react';
import {View, Text, Switch, StyleSheet} from 'react-native';
import {NotificationProps} from '../NotificationSettingsScreen';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {Settings} from 'src/models/settings';

const NotificationsItem: React.FC<NotificationProps> = props => {
  const {
    actions: {setters, storage},
    settings,
  } = React.useContext(ApplicationContext);
  return (
    <View style={Styles.itemContainer}>
      <Text
        style={{
          fontSize: 18,
        }}>
        {props.name}
      </Text>
      <Switch
        style={{transform: [{scale: 1.3}]}}
        value={props.value}
        onValueChange={async value => {
          let newSettings: Settings = {...settings};
          if (props.base === 'featured') {
            newSettings.notifications.featuredTeam[props.signedKey] = value;
          } else {
            newSettings.notifications.otherTeams[props.signedKey] = value;
          }

          setters.setSettings!(newSettings);
          await storage.setSettings(newSettings);
        }}
      />
    </View>
  );
};

const Styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'space-between',
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default NotificationsItem;
