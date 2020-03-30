import React, {useEffect, useState} from 'react';

import {ApplicationContext} from './src/context/ApplicationContext';
import Navigator from './src/navigation';
import firebase from './src/services/api/firebase';
import Firebase from 'firebase';
import BugReport from 'src/models/BugReport';
import Profile from 'src/models/Profile';
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
  useEffect(() => {}, []);
  const [featuredReports, setFeaturedReports] = useState<BugReport[]>([]);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);
  return (
    <ApplicationContext.Provider
      value={{
        settings: {},
        actions: {
          firebase,
          setters: {
            setFeaturedReports,
            setProfile,
          },
        },
        teams: [],
        featuredTeam: {
          name: `Leon's developers`,
          members: [
            {
              name: 'Leon lang',
              position: 'ADMIN',
              positonValue: 5,
              uuid: 'IvM9aSjjVCXZ9Up6szWhmGtIjl13',
            },
          ],
          reports: '19816b87-1d2b-49c2-9ca2-f7ce3ed544e9',
          uuid: '19816b87-1d2b-49c2-9ca2-f7ce3ed544e9',
          description: 'a test group',
          code: '089102',
          public: false,
        },
        featuredReports: featuredReports,
        profile,
      }}>
      <Navigator />
    </ApplicationContext.Provider>
  );
};

export default App;
