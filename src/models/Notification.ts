import {
  MainNavigatorParamList,
  DashboardParamList,
  TeamsParamList,
} from 'src/navigation';

export type ReportPayload = {
  reportId: string;
  teamId: string;
  type: 'UPDATE' | 'NEW';
};
export type TeamJoinPayload = {
  teamUUID: string;
  teamCode: string;
};
type Notification = {
  destinationStack: keyof MainNavigatorParamList;
  destinationPath: keyof DashboardParamList | keyof TeamsParamList;
  data: {
    title: string;
    message: string;
    payload?: ReportPayload | TeamJoinPayload;
  };
};

export default Notification;
