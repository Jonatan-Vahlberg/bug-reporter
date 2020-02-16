import Team from '../models/Team';

export default interface TeamsActions {
  joinTeam: (code: string) => Promise<void>;
  leaveTeam: () => Promise<void>;
  createTeam: (team: Team) => Promise<void>;
}
