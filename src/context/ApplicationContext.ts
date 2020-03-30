import * as React from 'react';
import Profile from '../models/Profile';
import Team from '../models/Team';
import firebaseActions from '../services/api/firebase';
import BugReport from 'src/models/BugReport';

export type ContextProps = {
  profile?: Profile;
  teams: Team[];
  featuredTeam?: Team;
  featuredReports: BugReport[];
  settings: object;
  actions: {
    firebase: typeof firebaseActions;
    setters: {
      setFeaturedReports?: React.Dispatch<React.SetStateAction<BugReport[]>>;
      setFeaturedTeam?: React.Dispatch<React.SetStateAction<Team>>;
      setSettings?: React.Dispatch<React.SetStateAction<object>>;
      setProfile?: React.Dispatch<React.SetStateAction<Profile | undefined>>;
    };
  };
};

export const ApplicationContext = React.createContext<ContextProps>({
  profile: undefined,
  actions: {
    firebase: firebaseActions,
    setters: {},
  },
  teams: [],
  featuredTeam: undefined,
  settings: {},
  featuredReports: [],
});
