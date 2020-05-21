import React, {useEffect, useState, useContext} from 'react';

import {ApplicationContext} from './src/context/ApplicationContext';
import Navigator from './src/navigation';
import firebase from './src/services/api/firebase';
import storage from './src/services/storage';
import Firebase from 'firebase';
import BugReport from 'src/models/BugReport';
import Profile from 'src/models/Profile';
import Team from 'src/models/Team';
import Notification from 'src/models/Notification';
import {Settings, emptySettings} from 'src/models/settings';
import {StatusBar} from 'react-native';
import colors from 'src/static/colors';
const firebaseConfig = {
  apiKey: 'AIzaSyBhvEvFrGhYXHeLUn6VEEfaPATvjfLXo4I',
  authDomain: 'bug-tracker-17906.firebaseapp.com',
  databaseURL: 'https://bug-tracker-17906.firebaseio.com',
  projectId: 'bug-tracker-17906',
  storageBucket: 'bug-tracker-17906.appspot.com',
  messagingSenderId: '825475753127',
  appId: '1:825475753127:web:c6ba0b8f33187bb76ae782',
  measurementId: 'G-S4CNHEGYH4',
};
Firebase.initializeApp(firebaseConfig);
const App = () => {
  const [featuredReports, setFeaturedReports] = useState<BugReport[]>([]);
  const [featuredTeam, setFeaturedTeam] = useState<Team>();
  const [settings, setSettings] = useState<Settings>({...emptySettings});
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <ApplicationContext.Provider
      value={{
        settings,
        actions: {
          firebase,
          setters: {
            setFeaturedReports,
            setFeaturedTeam,
            setProfile,
            setSettings,
            setNotifications,
          },
          storage,
        },
        teams: [],
        featuredTeam,
        featuredReports: featuredReports,
        profile,
        notifications,
      }}>
      <StatusBar barStyle="dark-content" backgroundColor={'white'} />

      <Navigator />
    </ApplicationContext.Provider>
  );
};

export default App;
