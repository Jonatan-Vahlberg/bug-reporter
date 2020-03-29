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
  const [profile, setProfile] = useState<Profile>({
    email: 'email@email.com',
    firstName: 'Marcus',
    lastName: 'lang',
    teams: ['e0a3cfd2-76f1-437a-91ad-09c6e96a0ba1'],
    uuid: 'IvM9aSjjVCXZ9Up6szWhmGtIjl13',
    FCMIDS: [],
  });
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
          name: 'Zim, c',
          members: [],
          reports: 'e0a3cfd2-76f1-437a-91ad-09c6e96a0ba1',
          uuid: 'e0a3cfd2-76f1-437a-91ad-09c6e96a0ba1',
          description: '',
          code: '101010',
          public: true,
        },
        featuredReports: featuredReports,
        profile,
      }}>
      <Navigator />
    </ApplicationContext.Provider>
  );
};

export default App;
