import TeamMember from './TeamMember';
import Comment from './Comment';

export default interface BugReport {
  uuid: string;
  title: string;
  content: ReportLine[]; //for now
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

export type ReportFilter = {
  overdue?: boolean;
  assigned?: boolean;
  thisWeek?: boolean;
  all?: boolean;
};

export type ReportStatus =
  | 'hashtag'
  | 'warning'
  | 'error'
  | 'done'
  | 'exclamation'
  | 'delete';
export type ReportLine = {line: string; status: ReportStatus};
