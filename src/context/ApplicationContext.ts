import * as React from 'react';
import ProfileActions from './ProfileActions';
import TeamsActions from './TeamsActions';
import TeamActions from './TeamActions';
import Profile from '../models/Profile';
import Team from '../models/Team';

export type ContextProps = {
  profile?: Profile;
  teams?: Team[];
  featuredTeam?: Team;
  profileActions: ProfileActions;
  teamsActions: TeamsActions;
  teamActions: TeamActions;
  settings: object;
};

export const ApplicationContext = React.createContext<Partial<ContextProps>>(
  {},
);
