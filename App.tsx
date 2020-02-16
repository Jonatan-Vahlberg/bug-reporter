import * as React from 'react';

import {ApplicationContext} from './src/context/ApplicationContext';
import Navigator from './src/navigation';

const App = () => {
  return (
    <ApplicationContext.Provider value={{}}>
      <Navigator />
    </ApplicationContext.Provider>
  );
};

export default App;
