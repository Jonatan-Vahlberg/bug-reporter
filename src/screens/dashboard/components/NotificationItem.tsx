import * as React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import Notification from 'src/models/Notification';
import {Card} from 'react-native-paper';
import {formatDate} from 'src/static/functions';

interface NotificationItemProps {
  onPress?: () => void;
  notification: Notification;
}

const NotificationItem: React.FC<NotificationItemProps> = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <Card style={styles.container}>
        <Text>
          {props.notification.data.title}{' '}
          {props.notification.timeStamp !== undefined &&
            ` at ${formatDate(props.notification.timeStamp)}`}
        </Text>
        <Text>{props.notification.data.message}</Text>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 2,
    padding: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  subtitle: {
    fontSize: 15,
  },
});

export default NotificationItem;
