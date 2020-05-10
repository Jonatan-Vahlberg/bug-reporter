import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';

export const SetupAndroidPushNotifications = () => {
  PushNotification.configure({
    onRegister: token => {
      console.log('TOKEN', token);
    },

    onNotification: notification => {
      console.log('NOTIFICATION_RECIEVED: ', notification);

      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    popInitialNotification: true,

    requestPermissions: true,
  });
};
