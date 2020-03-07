import * as React from 'react';
import BugReport, {SeverityValue} from '../../models/BugReport';
import {Navbar, ScreenComponent} from '../../components/common';
import BugReportListCard from './components/BugReportListCard';
import {View, ScrollView, StyleSheet} from 'react-native';
import CommentWritingBox from './components/CommentWritingBox';

import {DashboardParamList} from 'src/navigation';
import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface ReportProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'DASH_VIEW'>;
}

export interface ReportState {
  comment: string;
}

class ViewReportScreen extends React.Component<ReportProps, ReportState> {
  constructor(props: ReportProps) {
    super(props);
    this.state = {
      comment: '',
    };
  }
  render() {
    const report = this.props.route.params.report;
    return (
      <ScreenComponent>
        <Navbar navigation={this.props.navigation} title="" root={false} />
        <ScrollView>
          <BugReportListCard report={report} detail={true} />
          <View style={styles.commentBox}>
            <CommentWritingBox
              setValue={this.setValue}
              name="comment"
              value={this.state.comment}
            />
          </View>
        </ScrollView>
      </ScreenComponent>
    );
  }

  setValue = (name: keyof ReportState, value: string) => {
    this.setState({[name]: value} as Pick<ReportState, keyof ReportState>);
  };
}

const styles = StyleSheet.create({
  commentBox: {
    width: '100%',
    marginHorizontal: 20,
    paddingBottom: 10,
  },
});

export default ViewReportScreen;
