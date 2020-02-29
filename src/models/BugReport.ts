import TeamMember from './TeamMember';
import Comment from './Comment';

export default interface BugReport {
  uuid: string;
  title: string;
  content: string; //for now
  severity: SeverityValue;
  reportDate: string; //ISODATESTRING
  assignedTo?: TeamMember;
  labels?: string[];
  dueDate?: string; //ISODATESTRING
  comments?: Comment[];
  closed: boolean;
  reportedBy?: string;
}
export type SeverityValue = 'NONE' | 'LOW' | 'NORMAL' | 'HIGH' | 'CATASTROPHIC';
