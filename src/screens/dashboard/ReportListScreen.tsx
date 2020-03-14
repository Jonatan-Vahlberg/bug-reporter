import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {ScreenComponent, Navbar} from 'src/components/common';
import Report, {ReportFilter} from 'src/models/BugReport';
import {RouteProp} from '@react-navigation/native';
import BugReport from './components/Report/BugReportListCard';

type ReportListProps = {
  navigation: StackNavigationProp<DashboardParamList, 'DASH_LIST'>;
  route: RouteProp<DashboardParamList, 'DASH_LIST'>;
};

const ReportListScreen: React.FC<ReportListProps> = ({navigation, route}) => {
  const {actions} = React.useContext(ApplicationContext);
  const [reports, setRepors] = React.useState<Report[]>([]);
  React.useEffect(() => {
    (async () => {
      const reps = await actions.firebase.getReports(
        '00e0a3cfd2-76f1-437a-91ad-09c6e96a0ba100',
      );
      console.log(reps);
    })();
  });
  return (
    <ApplicationContext.Consumer>
      {context => {
        return (
          <ScreenComponent>
            <Navbar
              root={false}
              navigation={navigation}
              title={getTitle(route.params.filters)}
            />
            <BugReport
              report={{
                uuid: 'asdgzijccnoaj',
                title: 'Crashing on teams screen',
                content: [
                  {
                    line: 'Has<ul> <li>Lorem ipsum dolor sit amet,',
                    status: 'done',
                  },
                  {
                    line:
                      '     consectetuer adipiscing elit. Aenean commodo ligu…ede mollis pretium. Integer tincidunt.</li> </ul>',
                    status: 'error',
                  },
                ],
                reportDate: new Date().toISOString(),
                dueDate: new Date('2020-03-07').toISOString(),
                severity: 'CATASTROPHIC',
                closed: false,
              }}
              navigation={navigation}
            />
          </ScreenComponent>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

const getTitle = (filter?: ReportFilter): string => {
  if (filter === undefined) return 'Reports';
  if (filter.overdue !== undefined) return `Reports: Overdue`;
  if (filter.assigned !== undefined) return `Reports: Assigned`;
  if (filter.thisWeek !== undefined) return `Reports: This week`;
  return 'Reports';
};

export default ReportListScreen;
