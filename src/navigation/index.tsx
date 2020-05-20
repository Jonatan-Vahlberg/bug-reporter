import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';

import DashboardScreen from '../screens/dashboard/DashboardScreen';
import CreateNewReportScreen from '../screens/dashboard/CreateNewReportScreen';
import ViewReportScreen from '../screens/dashboard/ViewReportScreen';

import ProfileScreen from '../screens/profile/ProfileScreen';

import TeamsListScreen from '../screens/teams/TeamsListScreen';
import TeamDetailScreen from '../screens/teams/TeamDetailScreen';
import TeamsAdminScreen from '../screens/teams/TeamsAdminScreen';
import CreateNewTeamScreen from '../screens/teams/CreateNewTeamScreen';

import LoginScreen from '../screens/auth/LoginScreen';
import BugReport, {ReportFilter, ReportLine} from 'src/models/BugReport';
import Team, {LightTeam} from '../models/Team';
import {ApplicationContext} from '../context/ApplicationContext';
import ReportListScreen from 'src/screens/dashboard/ReportListScreen';
import ContentCreationModalScreen from 'src/screens/dashboard/ContentCreationModalScreen';
import ContentFlaggingModalScreen from 'src/screens/dashboard/ContentFlaggingModalScreen';
import SettingsScreen from 'src/screens/dashboard/settings/SettingsScreen';
import NotificationsScreen from 'src/screens/dashboard/NotificationsScreen';
import NotificationSettingsScreen from 'src/screens/dashboard/settings/NotificationSettingsScreen';

const DefaultStackOptions: StackNavigationOptions = {
  headerShown: false,
};

export type ProfileParamList = {
  PROFILE_HOME: undefined;
  PROFILE: undefined;
  DASH: undefined;
  AUTH: undefined;
};

const ProfileNavigator = () => {
  const ProfileStack = createStackNavigator<ProfileParamList>();
  return (
    <ProfileStack.Navigator screenOptions={DefaultStackOptions}>
      <ProfileStack.Screen name="PROFILE_HOME" component={ProfileScreen} />
    </ProfileStack.Navigator>
  );
};

export type TeamsParamList = {
  TEAMS_HOME: undefined;
  TEAMS_DETAIL: {teamBase: LightTeam};
  TEAMS_ADMIN: object;
  TEAMS_CREATE: undefined;
  PROFILE: undefined;
  DASH: undefined;
};

const TeamsNavigator = () => {
  const TeamsStack = createStackNavigator<TeamsParamList>();
  return (
    <TeamsStack.Navigator screenOptions={DefaultStackOptions}>
      <TeamsStack.Screen name="TEAMS_HOME" component={TeamsListScreen} />
      <TeamsStack.Screen name="TEAMS_DETAIL" component={TeamDetailScreen} />
      <TeamsStack.Screen name="TEAMS_ADMIN" component={TeamsAdminScreen} />
      <TeamsStack.Screen name="TEAMS_CREATE" component={CreateNewTeamScreen} />
    </TeamsStack.Navigator>
  );
};
type ContentModalType = 'REPORT' | 'UPDATE' | 'COMMENT' | 'COMMENT_UPDATE';
export type DashboardParamList = {
  DASH_HOME: undefined;
  DASH_CREATE: undefined;
  DASH_VIEW: {reportId: string};
  DASH_LIST: {filters?: ReportFilter; forceId?: string};
  TEAMS: undefined;
  TEAMS_ADMIN: undefined;
  PROFILE: undefined;
  CONTENT_MODAL: {
    type: ContentModalType;
    lines: ReportLine[];
    setLines: (lines: ReportLine[]) => void;
    setContent?: (content: string) => void;
    originalReport?: BugReport;
  };
  CONTENT_FLAG: {
    type: ContentModalType;
    setLines: (lines: ReportLine[]) => void;
    content: string;
    setContent?: (content: string) => void;
    lines?: ReportLine[];
    originalReport?: BugReport;
  };
  SETTINGS: undefined;
  SETTINGS_NOTIFICATIONS: undefined;
  NOTIFICATIONS: undefined;
};

const DashNavigator = () => {
  const DashStack = createStackNavigator<DashboardParamList>();

  return (
    <DashStack.Navigator screenOptions={DefaultStackOptions}>
      <DashStack.Screen name="DASH_HOME" component={DashboardScreen} />
      <DashStack.Screen name="DASH_CREATE" component={CreateNewReportScreen} />
      <DashStack.Screen
        name="CONTENT_MODAL"
        component={ContentCreationModalScreen}
      />
      <DashStack.Screen
        name="CONTENT_FLAG"
        component={ContentFlaggingModalScreen}
      />
      <DashStack.Screen name="DASH_VIEW" component={ViewReportScreen} />
      <DashStack.Screen name="DASH_LIST" component={ReportListScreen} />
      <DashStack.Screen name="SETTINGS" component={SettingsScreen} />
      <DashStack.Screen
        name="SETTINGS_NOTIFICATIONS"
        component={NotificationSettingsScreen}
      />
      <DashStack.Screen name="NOTIFICATIONS" component={NotificationsScreen} />
    </DashStack.Navigator>
  );
};

export type MainNavigatorParamList = {
  DASH: undefined;
  TEAMS: undefined;
  PROFILE: undefined;
  AUTH: undefined;
};

const MainNavigator = () => {
  const MainTab = createBottomTabNavigator<MainNavigatorParamList>();
  return (
    <MainTab.Navigator screenOptions={DefaultStackOptions}>
      <MainTab.Screen name="DASH" component={DashNavigator} />
      <MainTab.Screen name="TEAMS" component={TeamsNavigator} />
    </MainTab.Navigator>
  );
};
export type AuthParamList = {
  LOGIN: undefined;
  REGISTER: undefined;
  MAIN: undefined;
};
const AuthNavigator = () => {
  const AuthStack = createStackNavigator<AuthParamList>();
  return (
    <AuthStack.Navigator screenOptions={DefaultStackOptions}>
      <AuthStack.Screen name="LOGIN" component={LoginScreen} />
      <AuthStack.Screen name="REGISTER" component={LoginScreen} />
    </AuthStack.Navigator>
  );
};

export type RootParamList = {
  AUTH: undefined;
  MAIN: undefined;
};

const Navigator = () => {
  const RootStack = createStackNavigator<RootParamList>();
  return (
    <ApplicationContext.Consumer>
      {context => (
        <NavigationContainer>
          <RootStack.Navigator screenOptions={{headerShown: false}}>
            {context.profile ? (
              <>
                <RootStack.Screen name="MAIN" component={MainNavigator} />
              </>
            ) : (
              <>
                <RootStack.Screen name="AUTH" component={AuthNavigator} />
              </>
            )}
          </RootStack.Navigator>
        </NavigationContainer>
      )}
    </ApplicationContext.Consumer>
  );
};

export default Navigator;
