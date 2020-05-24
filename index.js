/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {SetupAndroidPushNotifications} from 'src/services/notifications';
if (Platform.OS === 'android') {
  console.disableYellowBox = true;
  SetupAndroidPushNotifications();
}
AppRegistry.registerComponent(appName, () => App);
