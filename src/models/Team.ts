import TeamMember from './TeamMember';
import BugReport from './BugReport';

export default interface Team {
  name: string;
  members: TeamMember[];
  reports: string[];
  uuid: string;
  description: string;
  code: string;
}
