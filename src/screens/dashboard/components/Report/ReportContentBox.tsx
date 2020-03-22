import * as React from 'react';
import {ScrollView, View, StyleSheet, Text, Button} from 'react-native';
import Profile from 'src/models/Profile';
import {ReportLine, ReportStatus} from 'src/models/BugReport';
import metrics from 'src/static/metrics';
import colors from 'src/static/colors';

import {TouchableOpacity} from 'react-native-gesture-handler';
import MatIcon from 'react-native-vector-icons/MaterialIcons';
import FontIcon from 'react-native-vector-icons/Fontisto';
import SimpIcon from 'react-native-vector-icons/SimpleLineIcons';

export interface ReportContentBoxProps {
  lines: ReportLine[];
  onOutput: (lines: ReportLine[]) => void;
  editable: boolean;
  maxLines: number;
  movable: boolean;
}

const ReportContentBox: React.FC<ReportContentBoxProps> = ({
  lines,
  onOutput,
  editable,
  maxLines,
  movable,
}) => {
  return (
    <View style={{padding: 5}}>
      <ScrollView horizontal scrollEnabled={movable}>
        <View>
          {lines.map((line: ReportLine, index: number) => {
            if (maxLines === index) return null;
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
                {editable && (
                  <TouchableOpacity
                    disabled={!editable}
                    onPress={() => {
                      let updatedLine = {
                        line: line.line,
                        status: updateStatusOfLine(line.status),
                      };

                      let updatedLines = lines;
                      updatedLines[index] = updatedLine;
                      onOutput(updatedLines);
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
                )}
                <Text>
                  {index + 1}.{' '}
                  <Text
                    style={{
                      ...styles.contentTextStyle,
                      backgroundColor,
                      color: textColor,
                      fontWeight:
                        line.status === 'exclamation' ? 'bold' : 'normal',
                    }}>
                    {line.line}
                  </Text>
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

const updateStatusOfLine = (status: ReportStatus): ReportStatus => {
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
