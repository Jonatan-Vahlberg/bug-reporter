import React, {useState} from 'react';
import Team from '../../models/Team';
import TeamMember from '../../models/TeamMember';
import {SeverityValue} from '../../models/BugReport';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  TextInput,
  Platform,
} from 'react-native';
import {titleRules} from '../../static/rules';

import {DashboardParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  FormError,
  Navbar,
  Button,
  FormWrapper,
  ScreenComponent,
} from '../../components/common';
import metrics from '../../static/metrics';
import colors from '../../static/colors';
import ReportContentBox, {
  ReportLine,
} from '../../components/bugreport/ReportContentBox';
import Picker from 'react-native-picker-select';
import {ApplicationContext} from '../../context/ApplicationContext';

import DateTimeModalPicker from 'react-native-modal-datetime-picker';
import {TouchableOpacity} from 'react-native-gesture-handler';

import moment from 'moment';
import Colors from '../../static/colors';

export interface ReportProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'DASH_CREATE'>;
}

export interface ReportState {
  title: string;
  content: string;
  labelsValue?: string[];
  dueDate?: string;
  assgingedTo?: TeamMember;
  severity: SeverityValue;
  labels: string;
}

const Fun_CreateNewReportScreen: React.FC<ReportProps> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [lines, setLines] = useState<ReportLine[]>([]);
  const [assignedTo, setAssignedTo] = useState<{value: string; label: string}>({
    value: '0000',
    label: 'No one',
  });
  const [severity, setSeverity] = useState<{
    value: SeverityValue;
    label: SeverityValue;
  }>({value: 'NONE', label: 'NONE'});
  const Severities: SeverityValue[] = [
    'NONE',
    'LOW',
    'NORMAL',
    'HIGH',
    'CATASTROPHIC',
  ];
  const [labels, setLabels] = useState<string>('');
  const [dueDate, setDueDate] = useState<Date | undefined>(undefined);
  const [dateVisible, setDateVisible] = useState<boolean>(false);

  let dateString = 'No selected date';
  if (dueDate !== undefined) {
    dateString = `${moment(dueDate).format('DD MMM YYYY hh:mm')}`;
  }
  return (
    <ApplicationContext.Consumer>
      {context => (
        <>
          <ScreenComponent>
            <Navbar
              title="Create new report"
              navigation={navigation}
              root={false}
            />
            <ScrollView>
              <FormError
                rules={{
                  title: titleRules,
                }}
                values={[{name: 'title', value: title}]}
                visible={false}
              />
              <FormWrapper>
                <Text>Title*</Text>
                <TextInput
                  value={title}
                  onChangeText={value => setTitle(value)}
                  placeholder="Enter your title"
                  style={styles.textInput}
                />
              </FormWrapper>
              <FormWrapper>
                <Text>Content*</Text>
                <TextInput
                  value={content}
                  onChangeText={value => {
                    setContent(value);
                    let newLines: ReportLine[] = value
                      .split('\n')
                      .map((line, index) => {
                        let newLine: ReportLine = {line, status: 'hashtag'};
                        if (lines.length === index) {
                          return newLine;
                        } else if (lines[index].line === line) {
                          return lines[index];
                        } else {
                          return newLine;
                        }
                      });
                    setLines(newLines);
                  }}
                  numberOfLines={8}
                  multiline
                  textAlignVertical="top"
                  placeholder="Content"
                  style={styles.textInput}
                />
                <ReportContentBox
                  onOutput={lines => setLines([...lines])}
                  editable
                  lines={lines}
                />
              </FormWrapper>
              <FormWrapper>
                <Text>Team options</Text>

                <Picker
                  onValueChange={value => setAssignedTo(value)}
                  value={assignedTo}
                  placeholder={{value: '000', label: 'Select a team member'}}
                  items={
                    context.featuredTeam !== undefined
                      ? context.featuredTeam.members.map(member => ({
                          value: member.uuid,
                          label: member.name,
                        }))
                      : [
                          {
                            value: '0000',
                            label: 'No one',
                          },
                        ]
                  }
                />
              </FormWrapper>
              <FormWrapper>
                <Text>Advanced options</Text>
                <TextInput
                  value={labels}
                  onChangeText={value => setLabels(value)}
                  placeholder="Enter labels separting with commas"
                  style={styles.textInput}
                />
                <Picker
                  onValueChange={value => setSeverity(value)}
                  value={severity}
                  placeholder={{
                    value: '000',
                    label: 'Select a report severity level',
                  }}
                  items={Severities.map(severity => ({
                    value: severity,
                    label: severity,
                  }))}
                />
                <Text>Due date</Text>
                <TouchableOpacity onPress={() => setDateVisible(true)}>
                  <Text style={styles.dateSelectorText}>{dateString}</Text>
                </TouchableOpacity>
              </FormWrapper>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button>
                <Text style={styles.buttonTextStyle}>Create Report</Text>
              </Button>
            </View>
          </ScreenComponent>
          <DateTimeModalPicker
            isVisible={dateVisible}
            mode="datetime"
            onCancel={() => setDateVisible(false)}
            onConfirm={date => {
              setDateVisible(false);
              setDueDate(date);
            }}
          />
        </>
      )}
    </ApplicationContext.Consumer>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    right: -15,
  },
  buttonTextStyle: {
    fontWeight: '700',
    fontSize: 25,
    color: '#fff',
    letterSpacing: 1.4,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: colors.backGroundColor,
    width: '100%',
  },
  dateSelectorText: {
    color: Colors.severityColors.NONE,
  },
});

export default Fun_CreateNewReportScreen;
