import {emptySettings} from 'src/context/ApplicationContext';
import AsyncStorage from '@react-native-community/async-storage';
import {Settings} from 'src/models/settings';

const ASYNC_SETTINGS_KEY = '@ASYNC_SETTINGS_KEY';
const storage = {
  setSettings: async (settings: Settings) => {
    try {
      const settingsString = JSON.stringify(settings);

      await AsyncStorage.setItem(ASYNC_SETTINGS_KEY, settingsString);

      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },

  getSettings: async () => {
    let settings: Settings = {...emptySettings};
    try {
      const settingsString = await AsyncStorage.getItem(ASYNC_SETTINGS_KEY);

      if (settingsString !== null) {
        settings = JSON.parse(settingsString);
        return settings;
      } else {
        return settings;
      }
    } catch (error) {
      console.warn(error);
      return settings;
    }
  },
};
export default storage;
