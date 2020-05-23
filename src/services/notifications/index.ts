import PushNotification from 'react-native-push-notification';
import {PushNotificationIOS} from 'react-native';
import storage from '../storage';
import Notification, {
  ReportPayload,
  TeamJoinPayload,
} from 'src/models/Notification';
import {Settings} from 'src/models/settings';

export const SetupAndroidPushNotifications = () => {
  PushNotification.configure({
    onRegister: token => {
      console.log('TOKEN', token);
      storage.setFCMID(token.token);
    },

    onNotification: async notification => {
      console.log('NOTIFICATION_RECIEVED: ', notification);
      const settings = await storage.getSettings();
      const notifications: Notification[] = await storage.getNotifications();
      console.log(settings, notifications);
      const notificationData: Notification = JSON.parse(
        //@ts-ignore
        notification.data.pushData,
      );

      if (
        checkNotificationPremissions(settings, notificationData) &&
        !notification.foreground
      ) {
        console.log('is it working');

        PushNotification.presentLocalNotification({
          title: notificationData.data.title,
          message: notificationData.data.message,
        });
      }
      await storage.setNotifications([
        ...notifications,
        {...notificationData, timeStamp: new Date().toISOString()},
      ]);
      if (notification.foreground) {
      }
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },

    popInitialNotification: true,

    requestPermissions: true,
  });
};

export const checkNotificationPremissions = (
  settings: Settings,
  notification: Notification,
): boolean => {
  const data = notification.data.payload;
  if (data !== undefined && isReport(data)) {
    if (settings.feautredTeamId === data.teamId) {
      if (
        data.type === 'NEW' ||
        settings.notifications.featuredTeam.all ||
        (data.type === 'UPDATE' &&
          (settings.notifications.featuredTeam.all ||
            settings.notifications.featuredTeam.mentions))
      ) {
        return true;
      }
    } else if (settings.notifications.otherTeams.mentions) {
      return true;
    }
    return false;
  } else if (data !== undefined && !isReport(data)) {
    return settings.notifications.otherTeams.invites;
  }
  return false;
};
export const isReport = (
  data: ReportPayload | TeamJoinPayload,
): data is ReportPayload => {
  return (data as ReportPayload).reportId !== undefined;
};
