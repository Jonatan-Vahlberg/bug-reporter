import * as React from 'react';
import BugReport, {SeverityValue} from '../../models/BugReport';
import {Navbar, ScreenComponent, Button} from '../../components/common';
import BugReportListCard from './components/Report/BugReportListCard';
import {View, ScrollView, StyleSheet, StatusBar, Text} from 'react-native';
import CommentWritingBox from './components/Report/CommentWritingBox';

import {DashboardParamList} from 'src/navigation';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import Header from './components/Report/ReportHeader';
import Subheader from './components/Report/ReportSubHeader';
import ReportContentBox from './components/Report/ReportContentBox';
import colors from 'src/static/colors';
import _ from 'lodash';
import ReportComments from './components/Report/ReportComments';
import {ApplicationContext} from 'src/context/ApplicationContext';

export interface ReportProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'DASH_VIEW'>;
}

const ViewReportScreen: React.FC<ReportProps> = ({navigation, route}) => {
  const {featuredReports} = React.useContext(ApplicationContext);
  const {reportId} = route.params;
  const report: BugReport = _.find(
    featuredReports,
    rep => rep.uuid === reportId,
  )!;
  const [comment, setComment] = React.useState<string>('');
  return (
    <ScreenComponent>
      <StatusBar
        barStyle="light-content"
        backgroundColor={colors.severityColors[report.severity]}
      />
      <ScrollView>
        <View style={styles.reportStyle}>
          <Header report={report} detail goBack={() => navigation.goBack()} />
          <Subheader report={report} detail />
          <ReportContentBox
            lines={report.content}
            onOutput={() => {}}
            editable={false}
            movable
            maxLines={2e6}
          />
        </View>
        <ReportComments comments={_.values(report.comments)} />
        <View style={styles.commentBox}>
          <Button
            action={() => {
              navigation.navigate('CONTENT_MODAL', {
                type: 'COMMENT',
                lines: [],
                setLines: lines => {},
                originalReport: report,
              });
            }}>
            <Text style={styles.buttonTextStyle}>Write comment</Text>
          </Button>
        </View>
      </ScrollView>
    </ScreenComponent>
  );
};

const styles = StyleSheet.create({
  commentBox: {
    marginRight: 40,
    marginLeft: 20,
    paddingBottom: 10,
  },

  buttonTextStyle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  reportStyle: {
    backgroundColor: colors.backGroundColor,
    marginBottom: 0,
    paddingBottom: 10,
  },
});

export default ViewReportScreen;
