import React, {useContext} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Navbar} from 'src/components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {ApplicationContext} from 'src/context/ApplicationContext';

interface NotificationsScreenProps {
  navigation: StackNavigationProp<DashboardParamList>;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = props => {
  const {notifications} = useContext(ApplicationContext);
  return (
    <View style={styles.container}>
      <Navbar
        navigation={props.navigation}
        root={false}
        title="Notifications"
      />
      <Text>NotificationsScreen</Text>
      {notifications.map(notis => (
        <>
          <Text>{notis.data.title}</Text>
          <Text>{notis.data.message}</Text>
        </>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default NotificationsScreen;
