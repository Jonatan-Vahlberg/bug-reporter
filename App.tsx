import * as React from 'react';

import {ApplicationContext} from './src/context/ApplicationContext';
import Navigator from './src/navigation';
import firebase from './src/services/api/firebase';

const App = () => {
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
