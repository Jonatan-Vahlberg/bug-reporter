import * as React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

import {TextInput} from 'src/components/common';
import colors from 'src/static/colors';
import {breakoutISODate} from 'src/static/functions';
import TeamMember from 'src/models/TeamMember';
import metrics from 'src/static/metrics';
import {DashboardParamList} from 'src/navigation';
import BugReport, {SeverityValue} from 'src/models/BugReport';
import {Card} from 'react-native-paper';
import ReportContentBox from './ReportContentBox';
import Subheader from './ReportSubHeader';
import Header from './ReportHeader';

export interface BugReportListCardProps {
  report: BugReport;
  detail?: boolean;
  navigation?: StackNavigationProp<DashboardParamList>;
}
const BugReportListCard: React.FC<BugReportListCardProps> = ({
  report,
  navigation,
  detail,
}) => {
  const {title, severity, content, closed, uuid} = report;
  const {root, header, headerText, cardRoot} = generateStyles(severity, closed);

  return (
    <View style={root}>
      <Card
        style={cardRoot}
        elevation={4}
        onPress={() =>
          detail === false
            ? navigation!.navigate('DASH_VIEW', {reportId: uuid})
            : {}
        }>
        <Header report={report} detail={false} />
        <Subheader
          report={report}
          detail={detail !== undefined ? detail : false}
        />
        <ReportContentBox
          lines={content}
          editable={false}
          onOutput={() => {}}
          maxLines={8}
          movable={detail !== undefined && detail}
        />
      </Card>
    </View>
  );
};

BugReportListCard.defaultProps = {
  detail: false,
};

const generateStyles = (severity: SeverityValue, closed: boolean) => {
  return StyleSheet.create({
    root: {
      paddingTop: 0,
      paddingHorizontal: 0,
      alignItems: 'center',
    },
    cardRoot: {
      width: metrics.screenWidth * 0.9,
      marginVertical: 10,
    },
    header: {
      backgroundColor: closed
        ? colors.severityColors.CLOSED
        : colors.severityColors[severity],
      minHeight: 60,
      width: '100%',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    headerText: {
      fontWeight: '600',
      fontSize: 18,
      color: '#fff',
      marginHorizontal: 10,
    },
  });
};

export default BugReportListCard;
