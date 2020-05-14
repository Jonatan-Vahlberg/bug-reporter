import BugReport from 'src/models/BugReport';
import Notification from 'src/models/Notification';
import Team from 'src/models/Team';
import notificationFunctions from '../../static/functions/notificationFunctions';
import Axios from 'axios';

const FCM_URL = 'https://fcm.googleapis.com/fcm/send';
const FCM_KEY =
  'AAAAwDIwZKc:APA91bG8E6JU73gX98IouYM5HZJcg10OWWS9a4EfzQxXx3gQboVnoDXdpxLTpU-eturzU1DD400NTEGIbgOnhJCQ7Ao-_1jDpS_NTTNFI-GFs_saB2TwY4FUS_Tx8utY9Bxnhp7XXNf7';

const FCM_BASE = {
  registration_ids: null,
  time_to_live: 86400,
  collapse_key: 'new_message',
  delay_while_idle: false,

  data: {
    pushData: null,
  },
};

const NotificationsFCM = {
  sendReportFCM: async (
    name: string,
    recivers: string[],
    type: 'NEW' | 'UPDATE',
    report: BugReport,
    team: Team,
  ) => {
    let title =
      type === 'NEW' ? 'A report has been made' : 'A report was commented on';
    let message =
      type === 'NEW'
        ? notificationFunctions.getReportCreationMessage(name, report, team)
        : notificationFunctions.getReportCommentMessage(name, report, team);

    let notificationData: Notification = {
      destinationStack: 'DASH_VIEW',
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
    try {
      const result = await Axios.post(
        FCM_URL,
        {
          ...FCM_BASE,
          registration_ids: recivers,
          data: {...FCM_BASE.data, pushData: notificationData},
        },
        {
          headers: {
            contentType: 'application/json',
            Authorization: `key=${FCM_KEY}`,
          },
        },
      );
      if (result.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },

  sendTeamFCM: async (name: string, recivers: string[], team: Team) => {
    let title = 'Team invitation';

    let message = notificationFunctions.getTeamInviteMessage(
      name,
      team.code,
      team,
    );
    let notificationData: Notification = {
      destinationStack: 'TEAMS',
      destinationPath: 'TEAMS',
      data: {
        title,
        message,
        payload: {
          teamUUID: team.uuid,
          teamCode: team.code,
        },
      },
    };

    try {
      const result = await Axios.post(
        FCM_URL,
        {
          ...FCM_BASE,
          registration_ids: recivers,
          data: {...FCM_BASE.data, pushData: notificationData},
        },
        {
          headers: {
            contentType: 'application/json',
            Authorization: `key=${FCM_KEY}`,
          },
        },
      );
      console.log(result);

      if (result.status === 200) {
        return true;
      }
      return false;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
};

export default NotificationsFCM;
