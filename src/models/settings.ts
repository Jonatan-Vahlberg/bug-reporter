export type PushSettings = {
  featuredTeam: {
    all: boolean;
    mentions: boolean;
  };
  otherTeams: {
    all: boolean;
    mentions: boolean;
    invites: boolean;
  };
};

export type Settings = {
  feautredTeamId: string | 'UNSET';
  notifications: PushSettings;
  stayLoggedIn: boolean;
  neverShowSelectTeam: boolean;
};
