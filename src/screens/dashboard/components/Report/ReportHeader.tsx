import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import BugReport, {SeverityValue} from 'src/models/BugReport';
import colors from 'src/static/colors';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const Header: React.FC<{
  report: BugReport;
  detail: boolean;
  goBack?: Function;
}> = ({report: {title, severity, closed}, detail, goBack}) => {
  const SeverityString =
    severity.charAt(0).toUpperCase() + severity.slice(1).toLowerCase();

  const {header, headerText} = generateStyles(severity, closed, detail);
  return (
    <View style={header}>
      {detail && (
        <View style={{width: 40, marginLeft: 10}}>
          <TouchableOpacity onPress={() => goBack!()}>
            <Icon name="arrow-left" color={colors.backGroundColor} size={40} />
          </TouchableOpacity>
        </View>
      )}
      <View style={{marginRight: detail ? 50 : 0, flex: 1}}>
        <Text lineBreakMode="tail" numberOfLines={1} style={headerText}>
          {title}
        </Text>
        {severity !== 'NONE' && (
          <Text lineBreakMode="tail" style={headerText}>
            {SeverityString} severity
          </Text>
        )}
      </View>
    </View>
  );
};

const generateStyles = (
  severity: SeverityValue,
  closed: boolean,
  detail: boolean,
) => {
  return StyleSheet.create({
    header: {
      backgroundColor: closed
        ? colors.severityColors.CLOSED
        : colors.severityColors[severity],
      minHeight: 60,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
    },
    headerText: {
      fontWeight: '600',
      fontSize: 18,
      color: '#fff',
      marginHorizontal: 10,
      alignSelf: 'center',
    },
  });
};

export default Header;
