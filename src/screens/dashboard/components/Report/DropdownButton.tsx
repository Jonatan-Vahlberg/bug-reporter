import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Text, Button} from 'react-native';
import {ReportLine, ReportStatus} from 'src/models/BugReport';
import colors from 'src/static/colors';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DropdownButton: React.FC<{
  onPress?: Function;
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({onPress, opened, setOpened}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        //onPress?
        setOpened(!opened);
      }}>
      <View style={styles.arrowContainer}>
        <View style={styles.arrowSideContainer} />
        <Icon
          color={colors.severityColors.NONE}
          style={{marginHorizontal: 5}}
          name={!opened ? 'arrow-down' : 'arrow-up'}
          size={20}
        />
        <View style={styles.arrowSideContainer} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  arrowSideContainer: {
    //marginHorizontal: 5,
    flex: 1,
    height: 1.9,
    backgroundColor: colors.severityColors.NONE,
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export default DropdownButton;
