import * as React from 'react';
import {ScrollView, View, StyleSheet, Text, Button} from 'react-native';
import Profile from '../../models/Profile';
import metrics from '../../static/metrics';
import colors from '../../static/colors';
import {ReportState} from '../../screens/dashboard/ViewReportScreen';
import {TouchableOpacity} from 'react-native-gesture-handler';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/Fontisto';
import SimpIcon from 'react-native-vector-icons/SimpleLineIcons';

export interface ReportContentBoxProps {
  text: string;
  onOutput: (lines: ReportLine[]) => void;
  editable: boolean;
  lines?: ReportLine[];
}
export type ReportSatus =
  | 'hashtag'
  | 'warning'
  | 'error'
  | 'done'
  | 'exclamation'
  | 'delete';
export type ReportLine = {line: string; status: ReportSatus};

const ReportContentBox: React.FC<ReportContentBoxProps> = ({
  text,
  onOutput,
  editable,
}) => {
  const [lines, setLines] = React.useState<ReportLine[]>(
    text.split('\n').map(line => ({line, status: 'hashtag'})),
  );
  console.log(lines);
  return (
    <View>
      <ScrollView horizontal>
        <View>
          {lines.map((line: ReportLine, index: number) => {
            let Icon = MatIcon;
            let iconColor = statusColors[line.status];
            if (line.status === 'hashtag') {
              Icon = FontIcon;
            } else if (line.status === 'exclamation') {
              Icon = SimpIcon;
            }

            let backgroundColor = iconColor;
            if (line.status === 'exclamation' || line.status === 'hashtag') {
              backgroundColor = 'transparent';
            }
            const textColor =
              line.status === 'error' || line.status === 'done'
                ? '#fff'
                : '#000';
            return (
              <View style={{...styles.lineBox}}>
                <TouchableOpacity
                  onPress={() => {
                    let updatedLine = {
                      line: line.line,
                      status: updateStatusOfLine(line.status),
                    };
                    setLines(lines => {
                      let updatedLines = lines;
                      updatedLines[index] = updatedLine;
                      onOutput(updatedLines);
                      return [...updatedLines];
                    });
                  }}>
                  <Icon
                    name={line.status}
                    color={statusColors[line.status]}
                    size={20}
                    style={{
                      marginRight: 20,
                      marginVertical: 2.5,
                      paddingVertical: 2.5,
                    }}
                  />
                </TouchableOpacity>
                <Text
                  style={{
                    ...styles.contentTextStyle,
                    backgroundColor,
                    color: textColor,
                    fontWeight:
                      line.status === 'exclamation' ? 'bold' : 'normal',
                  }}>
                  {index + 1}. {line.line}
                </Text>
              </View>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const statusColors = {
  hashtag: 'rgba(0,0,0,1)',
  warning: '#EED202',
  error: '#3b5998',
  exclamation: '#000',
  done: '#009A34',
  delete: '#d11a2a',
};

const updateStatusOfLine = (status: ReportSatus): ReportSatus => {
  switch (status) {
    case 'hashtag':
      return 'warning';
    case 'warning':
      return 'error';
    case 'error':
      return 'done';
    case 'done':
      return 'delete';
    case 'delete':
      return 'exclamation';
    case 'exclamation':
      return 'hashtag';
    default:
      return 'hashtag';
  }
};

const styles = StyleSheet.create({
  root: {
    width: metrics.screenWidth * 0.9,
    flexDirection: 'row',
    minHeight: 60,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  imgBox: {
    width: 53,
    aspectRatio: 1,
    borderWidth: 1.5,
    borderColor: '#000',
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 50,
    height: 50,
  },
  commentBox: {
    flexDirection: 'row',
    width: metrics.screenWidth * 0.9 - 70,
    marginLeft: 5,
    borderColor: '#000',
    borderWidth: 1.5,
    minHeight: 53,
    backgroundColor: colors.backGroundColor,
  },
  contentTextStyle: {
    width: '100%',
    height: '100%',
  },
  lineBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default ReportContentBox;
