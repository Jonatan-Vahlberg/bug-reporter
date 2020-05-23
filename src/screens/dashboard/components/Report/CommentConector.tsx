import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ActionString} from 'src/models/BugReport';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from 'src/static/colors';

const CommentConnector: React.FC<{action?: ActionString; name?: string}> = ({
  action,
  name,
}) => {
  const [iconName, iconColor, background] = getActionNameAndColors(action);
  console.log(action);

  return (
    <View>
      <View style={Styles.basicConnector} />
      {action !== undefined && (
        <View style={Styles.actionContainer}>
          <View style={{...Styles.bubble, backgroundColor: background}}>
            <Icon name={iconName} color={iconColor} size={30} />
          </View>
          <Text style={Styles.actionText}>
            Report was {action} by {name}{' '}
          </Text>
        </View>
      )}
      <View style={Styles.basicConnector} />
    </View>
  );
};

const Styles = StyleSheet.create({
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  basicConnector: {
    width: 4,
    height: 20,
    backgroundColor: colors.greyDetail,
    marginLeft: 50,
  },

  bubble: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 28,
  },
  actionText: {
    fontSize: 14,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
});

const getActionNameAndColors = (
  action?: ActionString,
): [string, string, string] => {
  switch (action) {
    case 'CLOSED':
      return ['close', '#fff', colors.redHighlight];
    case 'REOPENED':
      return ['lock-open', '#FFF', colors.greenHighlight];
    default:
      return ['', '', ''];
  }
};

export default CommentConnector;
