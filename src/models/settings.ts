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
