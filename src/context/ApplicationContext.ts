import * as React from 'react';
import Profile from '../models/Profile';
import Team from '../models/Team';
import firebaseActions from '../services/api/firebase';
import BugReport from 'src/models/BugReport';
import storage from 'src/services/storage';
import {Settings} from 'src/models/settings';

export const emptySettings: Settings = {
  feautredTeamId: 'UNSET',
  notifications: {
    featuredTeam: {
      all: false,
      mentions: false,
    },
    otherTeams: {
      all: false,
      mentions: false,
      invites: false,
    },
  },
  stayLoggedIn: false,
  neverShowSelectTeam: false,
};

export type ContextProps = {
  profile?: Profile;
  teams: Team[];
  featuredTeam?: Team;
  featuredReports: BugReport[];
  settings: Settings;
  actions: {
    firebase: typeof firebaseActions;
    storage: typeof storage;
    setters: {
      setFeaturedReports?: React.Dispatch<React.SetStateAction<BugReport[]>>;
      setFeaturedTeam?: React.Dispatch<React.SetStateAction<Team | undefined>>;
      setSettings?: React.Dispatch<React.SetStateAction<Settings>>;
      setProfile?: React.Dispatch<React.SetStateAction<Profile | undefined>>;
    };
  };
  uid?: string;
};

export const ApplicationContext = React.createContext<ContextProps>({
  profile: undefined,
  actions: {
    firebase: firebaseActions,
    setters: {},
    storage,
  },
  teams: [],
  featuredTeam: undefined,
  settings: {...emptySettings},
  featuredReports: [],
});
