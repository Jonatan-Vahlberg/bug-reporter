import * as React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Team from '../../models/Team';
import {Navbar, CheckBox, ScreenComponent} from '../../components/common';
import {View, Button} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import BugReportListCard from '../../components/bugreport/BugReportListCard';
import BugReport, {SeverityValue} from '../../models/BugReport';
import metrics from '../../static/metrics';
import {DashboardParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';

export interface DashProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'DASH_HOME'>;
}

export interface DashState {
  stayLoggedIn: boolean;
}

class DashboardScreen extends React.Component<DashProps, DashState> {
  constructor(props: DashProps) {
    super(props);
    this.state = {stayLoggedIn: false};
  }
  render() {
    return (
      <ScreenComponent>
        <Navbar
          title="Dashboard"
          navigation={this.props.navigation}
          root={true}
        />
        <Button
          title="Create"
          onPress={() => this.props.navigation.navigate('DASH_CREATE')}
        />
        <Button
          title="view"
          onPress={() => this.props.navigation.navigate('DASH_VIEW')}
        />
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            width: metrics.screenWidth,
          }}>
          <BugReportListCard
            report={{
              uuid: 'asdgzijccnoaj',
              title: 'Crashing on teams screen',
              content: `var SampleNamespace = {
              "init" : function() {…},
              "destroy" : function() {…},
              "defaultValue" : "…",
              "NestedNamespace" : {
                "member" : "..."
              }
            }`,
              reportDate: new Date().toISOString(),
              severity: SeverityValue.CATASTROPHIC,
              closed: false,
            }}
            navigateTo={this.navigateToViewReport}
          />
          <BugReportListCard
            report={{
              uuid: 'asdgzijsccnoaj',
              title: 'Minor artifact glitch',
              content: `<ScreenComponent>
              <Navbar
                title="Create new report"
                navigation={this.props.navigation}
                root={false}
              />
              <ScrollView>
                <TextInput
                  value={this.state.title}
                  name="title"
                  setValue={this.setValue}
                />
                <FormError
                  rules={{
                    title: titleRules,
                  }}
                  values={[{ name: 'title', value: this.state.title }]}
                  visible={false}
                />
                >`,
              reportDate: new Date().toISOString(),
              dueDate: new Date().toISOString(),
              severity: SeverityValue.LOW,
              closed: true,
            }}
            navigateTo={this.navigateToViewReport}
          />
        </View>
      </ScreenComponent>
    );
  }
  setValue = (key: keyof DashState, value: any | string | boolean) => {
    console.log(value);

    this.setState({[key]: value} as Pick<DashState, keyof DashState>);
  };
  renderDashboardTeam = () => {};
  renderDashboardNoTeam = (featuredTeam: Team) => {};

  navigateToViewReport = (bugReport: BugReport) => {
    this.props.navigation.navigate('DASH_VIEW', {
      report: bugReport,
    });
  };
}

export default DashboardScreen;
