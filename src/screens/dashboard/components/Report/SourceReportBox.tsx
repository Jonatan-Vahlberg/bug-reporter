import React, {useState} from 'react';
import {ScrollView, View, StyleSheet, Text, Button} from 'react-native';
import Profile from 'src/models/Profile';
import {ReportLine, ReportStatus} from 'src/models/BugReport';
import metrics from 'src/static/metrics';
import colors from 'src/static/colors';

import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Collapsible from 'react-native-collapsible';
import ReportContentBox from './ReportContentBox';
import {FormWrapper} from 'src/components/common';

const SourceReportBox: React.FC<{lines: ReportLine[]}> = props => {
  const [advancedCollapsed, setAdvancedCollapsed] = useState<boolean>(true);
  return (
    <FormWrapper>
      <Text style={styles.subtitleStyle}>Original Report</Text>
      <View style={{margin: 5}}>
        <TouchableOpacity
          onPress={() => setAdvancedCollapsed(!advancedCollapsed)}>
          <View style={styles.arrowContainer}>
            <View style={styles.arrowSideContainer} />
            <Icon
              color={colors.severityColors.NONE}
              style={{marginHorizontal: 5}}
              name={advancedCollapsed ? 'arrow-down' : 'arrow-up'}
              size={20}
            />
            <View style={styles.arrowSideContainer} />
          </View>
        </TouchableOpacity>
        <Collapsible collapsed={advancedCollapsed}>
          <ScrollView>
            <ReportContentBox
              onOutput={lines => {}}
              editable={false}
              lines={props.lines}
              maxLines={1000}
              movable={true}
            />
          </ScrollView>
        </Collapsible>
      </View>
    </FormWrapper>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    position: 'absolute',
    bottom: -15,
    left: -15,
    right: -15,
  },
  buttonTextStyle: {
    fontWeight: '700',
    fontSize: 25,
    color: '#fff',
    letterSpacing: 1.4,
  },
  textInput: {
    paddingHorizontal: 10,
    paddingTop: 10,
    backgroundColor: colors.backGroundColor,
    width: '100%',
  },
  dateSelectorText: {
    color: colors.severityColors.NONE,
  },
  subtitleStyle: {
    fontSize: 18,
    fontWeight: '600',
    paddingVertical: 2.5,
  },
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

export default SourceReportBox;
