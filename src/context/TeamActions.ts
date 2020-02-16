import BugReport from '../models/BugReport';
import ReportAction from '../models/ReportAction';

export default interface TeamActions {
  createReport: (report: BugReport) => Promise<void>;
  viewReport: (report: BugReport) => void;
  updateReport: (report: BugReport, action: ReportAction) => Promise<void>;
  requestAddTeamMember: (
    identifier: string,
    typeOfIdentifier: string,
  ) => Promise<void>; //TODO: typeOfIdentifier
}
