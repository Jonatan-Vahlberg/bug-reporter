import * as React from 'react';
import BugReport, { SeverityValue } from '../../models/BugReport';
import { Card, TextInput } from '../common';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../../static/colors';
import { breakoutISODate } from '../../static/functions';
import TeamMember from '../../models/TeamMember';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { StackNavigationProp } from 'react-navigation-stack/lib/typescript/src/vendor/types';
import metrics from '../../static/metrics';

export interface BugReportListCardProps {
  report: BugReport;
  detail?: boolean;
  navigateTo?: (report: BugReport) => void;
}

const BugReportListCard: React.FC<BugReportListCardProps> = (
  props: BugReportListCardProps,
) => {
  const {
    title,
    severity,
    content,
    assignedTo,
    dueDate,
    closed,
    reportDate,
  } = props.report;
  const {
    root,
    header,
    headerText,
    subheader,
    subheadPart,
    contentBox,
    cardRoot,
  } = generateStyles(severity, closed);
  const SeverityString =
    SeverityValue[severity].charAt(0).toUpperCase() +
    SeverityValue[severity].slice(1).toLowerCase();
  return (
    <View style={root}>
      <TouchableOpacity
        disabled={props.detail}
        onPress={() => props.navigateTo(props.report)}
      >
        <Card label={null} style={cardRoot}>
          <View style={header}>
            <Text numberOfLines={1} style={headerText}>
              {title}
            </Text>
            {severity !== SeverityValue.NONE && (
              <Text lineBreakMode="tail" style={headerText}>
                {SeverityString} severity
              </Text>
            )}
          </View>
          {renderSubheader(
            props.detail,
            assignedTo,
            dueDate,
            reportDate,
            subheader,
            subheadPart,
          )}
          {renderContent(props.detail, content, contentBox)}
        </Card>
      </TouchableOpacity>
    </View>
  );
};
const renderSubheader = (
  detail: boolean,
  assignedTo: TeamMember,
  dueDate: string,
  reportDate: string,
  subheaderStyle: object,
  subheadPart: object,
) => {
  if (detail) {
    return (
      <View style={[subheaderStyle, { flexDirection: 'column' }]}>
        <View style={[subheadPart]}>
          {assignedTo ? (
            <Text>Assigned to: {assignedTo.name}</Text>
          ) : (
            <Text>Assigned to: no one</Text>
          )}
        </View>

        <View style={[subheadPart, { flexDirection: 'row' }]}>
          {reportDate && (
            <Text>Report date: {breakoutISODate(reportDate)}</Text>
          )}
          {dueDate && <Text>Due date: {breakoutISODate(dueDate)}</Text>}
        </View>
      </View>
    );
  } else {
    return (
      <View style={subheaderStyle}>
        <View style={[subheadPart, { flex: 1 }]}>
          {assignedTo ? (
            <Text>Assigned to: {assignedTo.name}</Text>
          ) : (
            <Text>Assigned to: no one</Text>
          )}
        </View>
        <View style={[subheadPart]}>
          {dueDate && <Text>Due date: {breakoutISODate(dueDate)}</Text>}
        </View>
      </View>
    );
  }
};
const renderContent = (
  detail: boolean,
  content: string,
  contentboxStyle: object,
) => {
  return (
    <View style={contentboxStyle}>
      {detail && <Text>{content}</Text>}
      {!detail && <Text numberOfLines={8}>{content}</Text>}
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
      paddingTop: 0,
      paddingHorizontal: 0,
    },
    header: {
      backgroundColor: closed
        ? colors.severityColors.CLOSED
        : colors.severityColors[SeverityValue[severity]],
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
    subheader: {
      flexDirection: 'row',
    },
    subheadPart: {
      marginHorizontal: 10,
      alignItems: 'flex-start',
    },
    contentBox: {
      borderColor: '#000',
      borderWidth: 2,
      marginVertical: 15,
      marginHorizontal: 20,
      width: '90%',
      paddingHorizontal: 10,
      paddingVertical: 10,
    },
  });
};

export default BugReportListCard;
