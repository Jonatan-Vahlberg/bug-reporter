import React from 'react';
import {TouchableOpacity, View, Text, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface IconProps {
  action?: () => void;
  name?: string;
  size?: number;
  color?: string;
  style?: ViewStyle;
}

const TouchableIcon: React.FC<IconProps> = ({action, style, ...rest}) => {
  return (
    <TouchableOpacity onPress={action}>
      <Icon name={rest.name!} {...rest} style={style} />
    </TouchableOpacity>
  );
};

TouchableIcon.defaultProps = {
  name: 'home',
  color: 'red',
  size: 30,
  action: () => {},
};

export {TouchableIcon};
