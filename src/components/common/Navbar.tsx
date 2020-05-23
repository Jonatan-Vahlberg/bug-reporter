import * as React from 'react';
import {View, TouchableOpacity, StyleSheet, Dimensions} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {
  AuthParamList,
  MainNavigatorParamList,
  DashboardParamList,
  TeamsParamList,
} from '../../navigation';
import {Text} from './Text';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/static/colors';
export interface NavProps {
  navigation:
    | StackNavigationProp<AuthParamList>
    | StackNavigationProp<MainNavigatorParamList>
    | StackNavigationProp<DashboardParamList>
    | StackNavigationProp<TeamsParamList>;
  title?: string;
  root: boolean;
  color?: string;
  rightItem?: JSX.Element;
  leftItem?: JSX.Element;
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
        <View style={navStyles.sideContainerStyle}>
          {props.leftItem === undefined ? CreatedIcon : props.leftItem}
        </View>
      )}
      <View style={!props.rightItem && navStyles.titleContainerStyle}>
        <Text.Title>{props.title}</Text.Title>
      </View>
      {props.rightItem !== undefined && (
        <View style={{...navStyles.sideContainerStyle, alignItems: 'flex-end'}}>
          {props.rightItem}
        </View>
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
    width: '100%',
  },
  sideContainerStyle: {
    flex: 1,
    minWidth: 70,
    alignItems: 'flex-start',
  },
});

export {Navbar};
