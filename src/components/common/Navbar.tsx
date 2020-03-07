import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  ProfileParamList,
  AuthParamList,
  MainNavigatorParamList,
  DashboardParamList,
} from '../../navigation';
import {Text} from './Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/static/colors';
export interface NavProps {
  navigation:
    | StackNavigationProp<ProfileParamList>
    | StackNavigationProp<AuthParamList>
    | StackNavigationProp<MainNavigatorParamList>
    | StackNavigationProp<DashboardParamList>;
  title?: string;
  root: boolean;
  color?: string;
  rightItem?: JSX.Element;
}

const Navbar: React.FC<NavProps> = props => {
  const action = () => props.navigation.pop();
  const CreatedIcon = (
    <TouchableOpacity onPress={action}>
      <Icon name="arrow-left" size={40} />
    </TouchableOpacity>
  );

  return (
    <View style={navStyles.baseStyle}>
      {!props.root && (
        <View style={navStyles.sideContainerStyle}>{CreatedIcon}</View>
      )}
      <View style={navStyles.titleContainerStyle}>
        <Text.Title>{props.title}</Text.Title>
      </View>
      {props.rightItem !== undefined && (
        <View style={navStyles.sideContainerStyle}></View>
      )}
    </View>
  );
};

Navbar.defaultProps = {
  color: '#000',
};

const navStyles = StyleSheet.create({
  baseStyle: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backGroundColor,
    borderBottomColor: '#000',
    borderBottomWidth: 0.2,
    paddingHorizontal: 10,
  },
  titleContainerStyle: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  sideContainerStyle: {},
});

export {Navbar};
