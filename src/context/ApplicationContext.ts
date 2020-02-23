import * as React from 'react';
import ProfileActions from './ProfileActions';
import TeamsActions from './TeamsActions';
import TeamActions from './TeamActions';
import Profile from '../models/Profile';
import Team from '../models/Team';
import firebase, {ApiFirebaseInterface} from '../services/api/firebase';

export type ContextProps = {
  profile?: Profile;
  teams?: Team[];
  featuredTeam?: Team;
  settings: object;
  actions: {
    firebase: ApiFirebaseInterface;
  };
};

export const ApplicationContext = React.createContext<ContextProps>({
  profile: undefined,
  actions: {
    firebase: firebase,
  },
  teams: [],
  featuredTeam: undefined,
  settings: {},
});
