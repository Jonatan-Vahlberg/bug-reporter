import * as React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';

export interface NavProps {
  navigation: StackNavigationProp<{}>;
  title?: string;
  root: boolean;
  color?: string;
}

const Navbar: React.FC<NavProps> = (props: NavProps) => {
  const action = () => props.navigation.pop();
  const Icon = <TouchableOpacity onPress={action}>{null}</TouchableOpacity>;

  return (
    <View style={navStyles.baseStyle}>
      <View style={navStyles.sideContainerStyle}>{Icon}</View>
      <View style={navStyles.titleContainerStyle}>
        <Text style={navStyles.titleStyle}>{props.title}</Text>
      </View>
      <View style={navStyles.sideContainerStyle}></View>
    </View>
  );
};

Navbar.defaultProps = {
  color: '#000',
};

const navStyles = StyleSheet.create({
  baseStyle: {
    height: 80,
    width: Dimensions.get('screen').width,
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    paddingTop: 30,
    flexDirection: 'row',
    marginTop: 0,
    borderBottomColor: '#000',
    borderBottomWidth: 0.2,
    backgroundColor: '#fff',
  },
  titleContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  titleStyle: {
    fontWeight: '600',
    fontSize: 20,
  },
  sideContainerStyle: {
    width: 60,
  },
});

export {Navbar};
