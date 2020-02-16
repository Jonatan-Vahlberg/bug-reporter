import TeamMember from './TeamMember';
import BugReport from './BugReport';

export default interface Team {
  name: string;
  members: TeamMember[];
  reports: BugReport[];
  uuid: string;
  description: string;
}
