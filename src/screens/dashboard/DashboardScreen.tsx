import React, {useEffect, useContext, useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Team from '../../models/Team';
import {Navbar, CheckBox, ScreenComponent, Text} from '../../components/common';
import {View, Button, ScrollView} from 'react-native';
import NavigationPaths from '../../navigation/NavigationPaths';
import BugReportListCard from './components/Report/BugReportListCard';
import BugReport, {SeverityValue} from '../../models/BugReport';
import metrics from '../../static/metrics';
import {DashboardParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {ApplicationContext} from '../../context/ApplicationContext';
import ReportContentBox from './components/Report/ReportContentBox';
import DashHeader from './components/DashHeader';
import DashList from './components/DashList';
import {FAB, ActivityIndicator} from 'react-native-paper';
import Colors from 'src/static/colors';
import {firebaseDBErrorStatus} from 'src/services/api/firebase';
import LoadingScreenModal from './components/LoadingScreenModal';
import {emptySettings} from 'src/models/settings';
import NoTeamBox from './components/NoTeamBox';

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
    actions: {firebase, setters, storage},
    featuredTeam,
    featuredReports,
    profile,
    settings,
  } = useContext(ApplicationContext);
  const [loadingVisible, setLoadingVisible] = useState<boolean>(true);
  //const [timePassed,setTimePassed] = useState<
  console.log('Reports: ', featuredReports, featuredTeam);

  if (loadingVisible) {
    return (
      <LoadingScreenModal
        visible={loadingVisible}
        userID=""
        setVisability={() => setLoadingVisible(false)}
      />
    );
  }
  setTimeout(async () => {
    const storedNotifications = await storage.getNotifications();
    setters.setNotifications!([...storedNotifications]);
    console.log('GOT NOTIFICATIONS');
  }, 1000 * 60);
  console.log(settings);

  return (
    <ApplicationContext.Consumer>
      {context => (
        <ScreenComponent>
          <Navbar title="Dashboard" navigation={navigation} root={true} />
          <ScrollView>
            <DashHeader naviagtion={navigation} />
            {!featuredTeam && <NoTeamBox navigation={navigation} />}
            <DashList
              naviagtion={navigation}
              isFeatured={featuredTeam !== undefined}
            />
          </ScrollView>
          {featuredTeam && (
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
          )}
        </ScreenComponent>
      )}
    </ApplicationContext.Consumer>
  );
};

export default DashboardScreen;
