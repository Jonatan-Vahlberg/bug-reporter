import React from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  ViewStyle,
  ViewProps,
} from 'react-native';
import {Text} from '.';
import colors from 'src/static/colors';

const ProtectedView: React.FC<
  ViewProps & {
    userLevel: number;
    minLevel: number;
    maxLevel?: number;
    style?: ViewStyle;
  }
> = ({userLevel, minLevel, style, children, maxLevel}) => {
  if (
    userLevel < minLevel ||
    (maxLevel !== undefined && maxLevel < userLevel)
  ) {
    return null;
  }
  return <View style={style}>{children}</View>;
};

export {ProtectedView};
