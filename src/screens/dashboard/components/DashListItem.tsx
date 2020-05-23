import * as React from 'react';
import Colors from 'src/static/colors';
import {Text} from 'src/components/common';
import {Divider} from 'react-native-paper';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {ReportFilter} from 'src/models/BugReport';

type ParamName = keyof DashboardParamList;
export type ListItem = {
  name: string;
  icon?: string;
  navPath: ParamName;
  filter?: ReportFilter;
};
type HeaderProps = {item: ListItem};

const DashListItem: React.FC<HeaderProps> = ({item: {name, icon, navPath}}) => {
  const showIcon = icon !== undefined;
  const color = showIcon ? Colors.severityColors.CATASTROPHIC : 'transparent';
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingVertical: 2.5,
        }}>
        <Icon name={showIcon ? icon! : 'home'} size={40} color={color} />
        <Text.Base style={{fontSize: 22, marginLeft: 10}}>{name}</Text.Base>
      </View>
      <Divider style={{width: '100%', height: 0.9}} />
    </>
  );
};

export default DashListItem;
