import TeamMember, {TeamPosition} from './TeamMember';
import BugReport from './BugReport';

export default interface Team {
  name: string;
  members: TeamMember[];
  reports: string;
  uuid: string;
  description: string;
  code: string;
  public: boolean;
}

export interface LightTeam {
  name: string;
  uuid: string;
  personalPosition: TeamPosition;
  personalPositionValue: number;
}
