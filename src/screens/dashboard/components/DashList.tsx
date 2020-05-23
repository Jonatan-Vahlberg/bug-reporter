import * as React from 'react';
import Colors from 'src/static/colors';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import DashListItem, {ListItem} from './DashListItem';
import {TouchableOpacity} from 'react-native-gesture-handler';

type HeaderProps = {
  naviagtion: StackNavigationProp<DashboardParamList>;
  isFeatured: boolean;
};

const DashList: React.FC<HeaderProps> = ({naviagtion, isFeatured}) => {
  return (
    <View
      style={{
        width: '100%',
        paddingVertical: 10,
        backgroundColor: Colors.backGroundColor,
        marginVertical: 15,
        flex: 1,
        paddingHorizontal: 20,
      }}>
      {listItems.map(item => {
        if (
          isFeatured ||
          (item.name === 'Settings' || item.name === 'Notifications')
        ) {
          return (
            <TouchableOpacity
              key={item.name}
              onPress={() =>
                naviagtion.navigate(item.navPath, {filters: item.filter})
              }>
              <DashListItem item={item} />
            </TouchableOpacity>
          );
        }
      })}
    </View>
  );
};

const listItems: ListItem[] = [
  {
    name: 'All reports',
    icon: 'bug-outline',
    navPath: 'DASH_LIST',
    filter: {all: true},
  },
  {
    name: 'Assigned reports',
    navPath: 'DASH_LIST',
    filter: {assigned: true},
  },
  {
    name: 'Overdue reports',
    navPath: 'DASH_LIST',
    icon: 'alert-circle-outline',
    filter: {overdue: true},
  },
  {
    name: 'Reports this week',
    navPath: 'DASH_LIST',
    icon: 'calendar-outline',
    filter: {thisWeek: true},
  },
  {
    name: 'Team updates',
    icon: 'account-group-outline',
    navPath: 'DASH_LIST',
  },
  {name: 'Settings', icon: 'settings', navPath: 'SETTINGS'},
  {name: 'Notifications', icon: 'bell', navPath: 'NOTIFICATIONS'},
];

export default DashList;
