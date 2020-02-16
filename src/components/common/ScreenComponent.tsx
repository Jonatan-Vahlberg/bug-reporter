import * as React from 'react';
import { View } from 'react-native';
import metrics from '../../static/metrics';

const ScreenComponent: React.FC = props => {
  return (
    <View
      style={{
        width: metrics.screenWidth,
        height: metrics.screenHeight,
      }}
    >
      {props.children}
    </View>
  );
};

export { ScreenComponent };
