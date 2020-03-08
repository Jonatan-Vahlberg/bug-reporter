import React, {useState} from 'react';
import {SeverityValue, ReportLine} from 'src/models/BugReport';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

import {titleRules} from 'src/static/rules';

import {DashboardParamList} from 'src/navigation';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  FormError,
  Navbar,
  Button,
  FormWrapper,
  ScreenComponent,
  ScrollInput,
} from 'src/components/common';
import colors from 'src/static/colors';
import ReportContentBox from './components/Report/ReportContentBox';
import Picker from 'react-native-picker-select';
import {ApplicationContext} from '../../context/ApplicationContext';
import {Text as CText} from 'src/components/common';
import DateTimeModalPicker from 'react-native-modal-datetime-picker';

import moment from 'moment';
import Colors from '../../static/colors';
import {HelperText, TextInput} from 'react-native-paper';
import metrics from 'src/static/metrics';

export interface ReportProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'DASH_CREATE'>;
}

const CreateNewReportScreen: React.FC<ReportProps> = ({navigation, route}) => {
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
  const [errorVisible, setErrorVisible] = useState<boolean>(false);

  let dateString = 'No selected date';
  if (dueDate !== undefined) {
    dateString = `${moment(dueDate).format('DD MMM YYYY hh:mm')}`;
  }

  const isReportViable = (): boolean => content !== '' && title !== '';
  const isError = (statement: boolean): string =>
    errorVisible && !statement
      ? Colors.severityColors.HIGH
      : colors.severityColors.CATASTROPHIC;
  console.log(lines);

  return (
    <ApplicationContext.Consumer>
      {context => (
        <>
          <Navbar
            title="Create new report"
            navigation={navigation}
            root={false}
          />
          <ScreenComponent>
            <ScrollView
              keyboardShouldPersistTaps="handled"
              removeClippedSubviews={false}>
              <FormError
                rules={{
                  title: titleRules,
                }}
                values={[{name: 'title', value: title}]}
                visible={false}
              />
              <FormWrapper>
                <Text style={{color: isError(title !== '')}}>Title*</Text>
                <TextInput
                  value={title}
                  onChangeText={value => setTitle(value)}
                  placeholder="Enter your title"
                  style={styles.textInput}
                />
                <HelperText type="error" visible={errorVisible && title === ''}>
                  Title has to be filled in
                </HelperText>
              </FormWrapper>
              <FormWrapper>
                <Text style={{color: isError(content !== '')}}>Content*</Text>
                <ScrollInput
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
                  style={{
                    ...styles.textInput,
                    minWidth: metrics.screenWidth - 50,
                  }}
                  selectTextOnFocus
                />
                <HelperText
                  type="error"
                  visible={errorVisible && content === ''}>
                  Content has to be filled in
                </HelperText>
                <ReportContentBox
                  onOutput={lines => setLines([...lines])}
                  editable
                  lines={lines}
                  maxLines={1000}
                  movable={true}
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
                <Text>Severity</Text>
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

                <CText.LinkText
                  onPress={() => setDateVisible(true)}
                  style={styles.dateSelectorText}>
                  {dateString}
                </CText.LinkText>
              </FormWrapper>
            </ScrollView>
            <View style={styles.buttonContainer}>
              <Button
                action={() => {
                  if (isReportViable()) {
                    setErrorVisible(false);
                  } else {
                    setErrorVisible(true);
                  }
                }}>
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
    paddingTop: 10,
    backgroundColor: colors.backGroundColor,
    width: '100%',
  },
  dateSelectorText: {
    color: Colors.severityColors.NONE,
  },
});

export default CreateNewReportScreen;
