import * as React from 'react';

import {ApplicationContext} from './src/context/ApplicationContext';
import Navigator from './src/navigation';
import firebase from './src/services/api/firebase';
import {firebaseApp} from './enviroment/config';

const App = () => {
  //console.log(firebaseApp.database().ref('/reports'));

  return (
    <ApplicationContext.Provider
      value={{
        settings: {},
        actions: {
          firebase,
        },
        teams: [],
      }}>
      <Navigator />
    </ApplicationContext.Provider>
  );
};

export default App;
