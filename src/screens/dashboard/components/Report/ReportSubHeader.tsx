import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import colors from 'src/static/colors';
import {formatDate} from 'src/static/functions';
import metrics from 'src/static/metrics';
import BugReport, {SeverityValue} from 'src/models/BugReport';

const Subheader: React.FC<{report: BugReport; detail: boolean}> = props => {
  const {assignedTo, dueDate, reportDate, severity, closed} = props.report;

  const {subheadPart, subheader} = generateStyles(severity, closed);
  if (props.detail) {
    return (
      <View style={[subheader, {flexDirection: 'column'}]}>
        <View style={[subheadPart]}>
          {assignedTo ? (
            <Text>Assigned to: {assignedTo.name}</Text>
          ) : (
            <Text>Assigned to: no one</Text>
          )}
        </View>

        <View style={[subheadPart, {flexDirection: 'column'}]}>
          {reportDate && <Text>Report date: {formatDate(reportDate)}</Text>}
          {dueDate && <Text>Due date: {formatDate(reportDate)}</Text>}
        </View>
      </View>
    );
  } else {
    return (
      <View style={subheader}>
        <View style={[subheadPart]}>
          {assignedTo ? (
            <Text>Assigned to: {assignedTo.name}</Text>
          ) : (
            <Text>Assigned to: no one</Text>
          )}
        </View>
        <View style={[subheadPart]}>
          {dueDate && <Text>Due date: {formatDate(dueDate)}</Text>}
        </View>
      </View>
    );
  }
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
    subheader: {
      flexDirection: 'column',
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

export default Subheader;
