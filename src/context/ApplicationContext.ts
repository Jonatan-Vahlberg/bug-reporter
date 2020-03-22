import * as React from 'react';
import ProfileActions from './ProfileActions';
import TeamsActions from './TeamsActions';
import TeamActions from './TeamActions';
import Profile from '../models/Profile';
import Team from '../models/Team';
import firebase, {ApiFirebaseInterface} from '../services/api/firebase';
import BugReport from 'src/models/BugReport';

export type ContextProps = {
  profile?: Profile;
  teams: Team[];
  featuredTeam?: Team;
  featuredReports: BugReport[];
  settings: object;
  actions: {
    firebase: ApiFirebaseInterface;
    setters: {
      setFeaturedReports?: React.Dispatch<React.SetStateAction<BugReport[]>>;
      setFeaturedTeam?: React.Dispatch<React.SetStateAction<Team>>;
      setSettings?: React.Dispatch<React.SetStateAction<object>>;
    };
  };
};

export const ApplicationContext = React.createContext<ContextProps>({
  profile: undefined,
  actions: {
    firebase: firebase,
    setters: {},
  },
  teams: [],
  featuredTeam: undefined,
  settings: {},
  featuredReports: [],
});
