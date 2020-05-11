import BugReport from 'src/models/BugReport';
import Notification from 'src/models/Notification';
import Team from 'src/models/Team';

const NotificationsFCM = {
  sendReportFCM: (
    recivers: string[],
    type: 'NEW' | 'UPDATE',
    report: BugReport,
    team: Team,
  ) => {
    let title =
      type === 'NEW'
        ? `A new report has been made`
        : 'A report has been updated recently';
    let message =
      type === 'NEW'
        ? `"${report.title}" was recently created,`
        : `"${report.title}" was updated by ${report.reportedBy} from ${
            team.name
          }.`;
    let notificationData: Notification = {
      destinationStack: 'DASH',
      destinationPath: 'DASH_VIEW',
      data: {
        title,
        message,
        payload: {
          reportId: report.uuid,
          teamId: team.uuid,
          type,
        },
      },
    };
  },
};

export default NotificationsFCM;
