import * as React from 'react';
import Team from '../../models/Team';
import TeamMember from '../../models/TeamMember';
import {SeverityValue} from '../../models/BugReport';
import {View, Text, ScrollView, StyleSheet} from 'react-native';
import {titleRules} from '../../static/rules';

import {DashboardParamList} from '..';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {
  TextInput,
  FormError,
  Navbar,
  Button,
  FormWrapper,
  ScreenComponent,
} from '../../components/common';
import metrics from '../../static/metrics';

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
      severity: SeverityValue.NONE,
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
            <Text>Team options</Text>
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
});

export default CreateNewReportScreen;
