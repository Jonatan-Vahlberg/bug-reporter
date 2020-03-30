import React, {useEffect, useState, useContext} from 'react';

import {
  ApplicationContext,
  emptySettings,
} from './src/context/ApplicationContext';
import Navigator from './src/navigation';
import firebase from './src/services/api/firebase';
import storage from './src/services/storage';
import Firebase from 'firebase';
import BugReport from 'src/models/BugReport';
import Profile from 'src/models/Profile';
import {Settings} from './src/context/ApplicationContext';
import Team from 'src/models/Team';
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
          },
          storage,
        },
        teams: [],
        featuredTeam,
        featuredReports: featuredReports,
        profile,
      }}>
      <Navigator />
    </ApplicationContext.Provider>
  );
};

export default App;
