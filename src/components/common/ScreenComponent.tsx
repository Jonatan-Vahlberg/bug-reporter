import * as React from 'react';
import {View} from 'react-native';
import metrics from '../../static/metrics';

const ScreenComponent: React.FC = props => {
  return (
    <View
      style={{
        width: metrics.screenWidth,
        flex: 1,
      }}>
      {props.children}
    </View>
  );
};

export {ScreenComponent};
