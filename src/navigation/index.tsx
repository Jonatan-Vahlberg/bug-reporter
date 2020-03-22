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
import BugReport, {ReportFilter} from 'src/models/BugReport';
import Team from '../models/Team';
import {ApplicationContext} from '../context/ApplicationContext';
import ReportListScreen from 'src/screens/dashboard/ReportListScreen';

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
  TEAMS_DETAIL: {team: Team};
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

export type DashboardParamList = {
  DASH_HOME: undefined;
  DASH_CREATE: undefined;
  DASH_VIEW: {report: BugReport};
  DASH_LIST: {filters?: ReportFilter};
  TEAMS: undefined;
  PROFILE: undefined;
};

const DashNavigator = () => {
  const DashStack = createStackNavigator<DashboardParamList>();

  return (
    <DashStack.Navigator screenOptions={DefaultStackOptions}>
      <DashStack.Screen name="DASH_HOME" component={DashboardScreen} />
      <DashStack.Screen name="DASH_CREATE" component={CreateNewReportScreen} />
      <DashStack.Screen name="DASH_VIEW" component={ViewReportScreen} />
      <DashStack.Screen name="DASH_LIST" component={ReportListScreen} />
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
      <MainTab.Screen name="PROFILE" component={ProfileNavigator} />
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
            {context.profile === undefined ? (
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
