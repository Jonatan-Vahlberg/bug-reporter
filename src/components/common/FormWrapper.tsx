import React from 'react';
import { View, StyleSheet } from 'react-native';

import colors from '../../static/colors';

interface InputProps {}

const FormWrapper: React.FC<InputProps> = props => {
  const { outerContainer, containerStyle } = styles;
  return (
    <View style={outerContainer}>
      <View style={containerStyle}>{props.children}</View>
    </View>
  );
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

export { FormWrapper };
