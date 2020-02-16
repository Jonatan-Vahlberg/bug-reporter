import React from 'react';
import {TouchableOpacity, View, Text} from 'react-native';

interface IconProps {
  name?: string;
  size?: number;
  color?: string;
  action: Function;
}

const TouchableIcon: React.FC<IconProps> = ({name, size, color, action}) => {
  return (
    <View style={{justifyContent: 'center', alignItems: 'center', padding: 5}}>
      <TouchableOpacity onPress={() => action()}>
        <Text>HI</Text>
      </TouchableOpacity>
    </View>
  );
};

TouchableIcon.defaultProps = {
  name: 'home',
  color: 'red',
  size: 30,
  action: () => {},
};

export {TouchableIcon};
