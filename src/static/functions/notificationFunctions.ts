import BugReport from 'src/models/BugReport';
import Team from 'src/models/Team';
import Profile from 'src/models/Profile';

export default {
  getReportUpdateMessage: (name: string, report: BugReport, team: Team) => {
    return `${name} has updated ${report.title}`;
  },
  getReportCommentMessage: (name: string, report: BugReport, team: Team) => {
    return `${name} has commented on ${report.title}`;
  },
  getReportCreationMessage: (name: string, report: BugReport, team: Team) => {
    return `${name} has created a new report: ${report.title}`;
  },
  getTeamInviteMessage: (name: string, code: string, team: Team) => {
    return `${name} has invited you to ${
      team.name
    } you can join with the code: ${code}`;
  },

  getFCMIDsFromTeamMebers: (team: Team, sender: Profile) => {
    return team.members
      .filter(
        member => member.fcmid !== undefined && member.uuid !== sender.uuid,
      )
      .map(member => member.fcmid);
  },
};
