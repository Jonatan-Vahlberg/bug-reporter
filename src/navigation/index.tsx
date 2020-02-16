import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';

import DashboardScreen from './dashboard/DashboardScreen';
import CreateNewReportScreen from './dashboard/CreateNewReportScreen';
import ViewReportScreen from './dashboard/ViewReportScreen';

import ProfileScreen from './profile/ProfileScreen';

import TeamsListScreen from './teams/TeamsListScreen';
import TeamDetailScreen from './teams/TeamDetailScreen';
import TeamsAdminScreen from './teams/TeamsAdminScreen';
import CreateNewTeamScreen from './teams/CreateNewTeamScreen';

import LoginScreen from './auth/LoginScreen';
import BugReport from 'src/models/BugReport';
import Team from 'src/models/Team';

export type ProfileParamList = {
  PROFILE_HOME: undefined;
  PROFILE: undefined;
  DASH: undefined;
  AUTH: undefined;
};

const ProfileNavigator = () => {
  const ProfileStack = createStackNavigator<ProfileParamList>();
  return (
    <ProfileStack.Navigator>
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
    <TeamsStack.Navigator>
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
  TEAMS: undefined;
  PROFILE: undefined;
};

const DashNavigator = () => {
  const DashStack = createStackNavigator<DashboardParamList>();
  return (
    <DashStack.Navigator>
      <DashStack.Screen name="DASH_HOME" component={DashboardScreen} />
      <DashStack.Screen name="DASH_CREATE" component={CreateNewReportScreen} />
      <DashStack.Screen name="DASH_VIEW" component={ViewReportScreen} />
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
    <MainTab.Navigator>
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
    <AuthStack.Navigator>
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
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{headerShown: false}}>
        <RootStack.Screen name="MAIN" component={MainNavigator} />
        <RootStack.Screen name="AUTH" component={AuthNavigator} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

export default Navigator;
