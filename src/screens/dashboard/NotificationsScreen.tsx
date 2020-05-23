import React, {useContext} from 'react';
import {Text, View, StyleSheet, ScrollView} from 'react-native';
import {Navbar} from 'src/components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {ApplicationContext} from 'src/context/ApplicationContext';
import NotificationsItem from './components/NotificationItem';
import {isReport} from 'src/services/notifications';

interface NotificationsScreenProps {
  navigation: StackNavigationProp<DashboardParamList>;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = props => {
  const {notifications, featuredTeam} = useContext(ApplicationContext);

  const filteredNotifications = notifications.filter(notification => {
    if (isReport(notification.data.payload!)) {
      if (
        featuredTeam &&
        featuredTeam.uuid === notification.data.payload.teamId
      ) {
        return notification;
      }
    } else {
      return notification;
    }
  });
  return (
    <View style={styles.container}>
      <Navbar
        navigation={props.navigation}
        root={false}
        title="Notifications"
      />
      <ScrollView>
        {filteredNotifications.map(notification => (
          <NotificationsItem
            notification={notification}
            onPress={() => {
              if (notification.destinationStack === 'TEAMS') {
                props.navigation.navigate('TEAMS_ADMIN');
              } else if (isReport(notification.data.payload!)) {
                props.navigation.navigate('DASH_LIST', {
                  forceId: notification.data.payload.reportId,
                });
              }
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NotificationsScreen;
