import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';

import colors from '../../static/colors';

interface InputProps {
  outerStyle?: ViewStyle;
}

const FormWrapper: React.FC<InputProps> = props => {
  const {outerContainer, containerStyle} = styles;
  return (
    <View style={{...outerContainer, ...props.outerStyle}}>
      <View style={containerStyle}>{props.children}</View>
    </View>
  );
};

FormWrapper.defaultProps = {
  outerStyle: {},
};

const styles = StyleSheet.create({
  outerContainer: {
    flexDirection: 'row',

    marginHorizontal: 15,
    marginVertical: 10,
  },
  containerStyle: {
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: colors.lightGreyBackground,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
});

export {FormWrapper};
