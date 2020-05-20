import React, {useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {ScreenComponent, Navbar} from 'src/components/common';
import BugReport, {ReportFilter} from 'src/models/BugReport';
import {RouteProp} from '@react-navigation/native';
import BugReportListCard from './components/Report/BugReportListCard';
import Profile from 'src/models/Profile';
import { getDateOfStartAndEndOfWeek } from 'src/static/functions';

type ReportListProps = {
  navigation: StackNavigationProp<DashboardParamList, 'DASH_LIST'>;
  route: RouteProp<DashboardParamList, 'DASH_LIST'>;
};

const ReportListScreen: React.FC<ReportListProps> = ({navigation, route}) => {
  const {actions, featuredReports, featuredTeam, profile} = React.useContext(
    ApplicationContext,
  );
   console.log(featuredReports);
      
  useEffect(() => {
    (async () => {
      await actions.firebase.getRealtimeReports(
        featuredTeam!.uuid,
        actions.setters.setFeaturedReports!,
      );
    })();
  }, []);
  
  if(route.params.forceId !== undefined){
    const [foundReport,setFoundReport] = useState<boolean>(false)
    useEffect(() => {
      const report = featuredReports.find(report => report.uuid === route.params.forceId)
      if(report !== undefined && !foundReport){
        navigation.navigate("DASH_VIEW",{reportId: report.uuid})
        setFoundReport(true)
      }
    },[featuredReports])
  }
  return (
    <ApplicationContext.Consumer>
      {(context) => {
        return (
          <ScreenComponent>
            <Navbar
              root={false}
              navigation={navigation}
              title={getTitle(route.params.filters)}
            />
            {getRightReports(featuredReports,profile!, route.params.filters).map((report) => (
              <BugReportListCard
                key={report.uuid}
                report={{...report}}
                navigation={navigation}
              />
            ))}
          </ScreenComponent>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

const getRightReports = (reports: BugReport[],profile: Profile, filters?: ReportFilter): BugReport[] => {
  if(filters === undefined){
    return reports
  }
  if(filters.assigned){
    return reports.filter((report) => report.assignedTo?.uuid === profile.uuid )
  }
  if(filters.overdue) return reports.filter((report) =>{
    return report.dueDate !== undefined && new Date(report.dueDate) > new Date() 
  })
  if(filters.thisWeek){
    return reports.filter((report) => {
     const [startDate,endDate] = getDateOfStartAndEndOfWeek()
      return report.dueDate !== undefined && (new Date() > startDate && new Date() < endDate) 
    })

  }
  return reports
}

const getTitle = (filter?: ReportFilter): string => {
  if (filter === undefined) return 'Reports';
  if (filter.overdue !== undefined) return `Reports: Overdue`;
  if (filter.assigned !== undefined) return `Reports: Assigned`;
  if (filter.thisWeek !== undefined) return `Reports: This week`;
  return 'Reports';
};

export default ReportListScreen;

/*
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
            */
