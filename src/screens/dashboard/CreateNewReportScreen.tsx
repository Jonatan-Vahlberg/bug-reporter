import * as React from 'react';
import Team from '../../models/Team';
import TeamMember from '../../models/TeamMember';
import {SeverityValue} from '../../models/BugReport';
import {View, Text, ScrollView, StyleSheet, TextInput} from 'react-native';
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

class CreateNewReportScreen extends React.Component<ReportProps, ReportState> {
  constructor(props: ReportProps) {
    super(props);
    this.state = {
      title: '',
      content: '',
      labelsValue: [],
      labels: '',
      dueDate: undefined,
      assgingedTo: undefined,
      severity: 'NONE',
    };
  }
  render() {
    return (
      <ScreenComponent>
        <Navbar
          title="Create new report"
          navigation={this.props.navigation}
          root={false}
        />
        <ScrollView>
          <FormError
            rules={{
              title: titleRules,
            }}
            values={[{name: 'title', value: this.state.title}]}
            visible={false}
          />
          <FormWrapper>
            <Text>Title</Text>
            <TextInput
              placeholder="Enter your title"
              style={styles.textInput}
            />
          </FormWrapper>
          <FormWrapper>
            <TextInput
              numberOfLines={8}
              textAlignVertical="top"
              placeholder="Content"
              style={styles.textInput}
            />
          </FormWrapper>
          <FormWrapper>
            <Text>Team options</Text>
            <TextInput style={styles.textInput} />
          </FormWrapper>
          <FormWrapper>
            <Text>Advanced options</Text>
          </FormWrapper>
        </ScrollView>
        <View style={styles.buttonContainer}>
          <Button>
            <Text style={styles.buttonTextStyle}>Create Report</Text>
          </Button>
        </View>
      </ScreenComponent>
    );
  }

  setValue = (key: keyof ReportState, value: any | string) => {
    this.setState({[key]: value} as Pick<ReportState, keyof ReportState>);
  };
}

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
});

export default CreateNewReportScreen;
