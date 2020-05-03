import * as React from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';
import {Text} from '.';
import colors from 'src/static/colors';

const LargeSpinner: React.FC<{message: string}> = ({message}) => {
  return (
    <View style={styles().base}>
      <ActivityIndicator style={styles().spinner} />
      <Text.Caption>{message}</Text.Caption>
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    base: {
      flex: 1,
      backgroundColor: colors.backGroundColor,
      justifyContent: 'center',
      alignItems: 'center',
    },
    spinner: {
      transform: [{scale: 2.5}],
      margin: 50,
    },
  });

export {LargeSpinner};
