import React, {useEffect, useContext} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Team from '../../models/Team';
import {Navbar, CheckBox, ScreenComponent, Text} from '../../components/common';
import {View, Button, ScrollView} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import BugReportListCard from './components/BugReportListCard';
import BugReport, {SeverityValue} from '../../models/BugReport';
import metrics from '../../static/metrics';
import {DashboardParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {ApplicationContext} from '../../context/ApplicationContext';
import ReportContentBox from './components/ReportContentBox';
import DashHeader from './components/DashHeader';
import DashList from './components/DashList';
import {FAB} from 'react-native-paper';
import Colors from 'src/static/colors';

export interface DashProps {
  navigation: StackNavigationProp<DashboardParamList>;
  route: RouteProp<DashboardParamList, 'DASH_HOME'>;
}

const text = `<View style={{flexDirection: 'row'}}>
<TouchableOpacity
  onPress={() => {
    let updatedLine = {
      line: line.line,
      status: updateStatusOfLine(line.status),
    };
    setLines(lines => {
      let updatedLines = lines;
      updatedLines[index] = updatedLinefbasbfjidakgjasnjdfnasojndok nsokdnokasndokanokdnolkjasnok;
      onOutput(updatedLines);
      return updatedLines;
    });
  }}>`;

const DashboardScreen: React.FC<DashProps> = ({navigation, route}) => {
  const {
    actions: {firebase},
  } = useContext(ApplicationContext);
  React.useEffect(() => {
    (async () => {
      const result = await firebase.login('email@email.com', 'password');
      console.log(result);
    })();
  });

  return (
    <ApplicationContext.Consumer>
      {context => (
        <ScreenComponent>
          <Navbar title="Dashboard" navigation={navigation} root={true} />
          <DashHeader naviagtion={navigation} />
          <DashList naviagtion={navigation} />
          <FAB
            icon="plus"
            color={Colors.backGroundColor}
            style={{
              position: 'absolute',
              bottom: 10,
              right: 10,
              backgroundColor: Colors.darkerBasicBlue,
            }}
            onPress={() => navigation.navigate('DASH_CREATE')}
          />
        </ScreenComponent>
      )}
    </ApplicationContext.Consumer>
  );
};

export default DashboardScreen;

/* <View
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
    severity: 'CATASTROPHIC',
    closed: false,
  }}
  navigation={navigation}
/>
</View> */
