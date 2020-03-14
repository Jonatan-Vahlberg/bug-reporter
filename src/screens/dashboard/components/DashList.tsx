import * as React from 'react';
import Colors from 'src/static/colors';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import DashListItem, {ListItem} from './DashListItem';
import {TouchableOpacity} from 'react-native-gesture-handler';

type HeaderProps = {naviagtion: StackNavigationProp<DashboardParamList>};

const DashList: React.FC<HeaderProps> = ({naviagtion}) => {
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
      {listItems.map(item => (
        <TouchableOpacity
          key={item.name}
          onPress={() =>
            naviagtion.navigate('DASH_LIST', {filters: item.filter})
          }>
          <DashListItem item={item} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const listItems: ListItem[] = [
  {
    name: 'All bugs',
    icon: 'bug-outline',
    navPath: 'DASH_LIST',
    filter: {all: true},
  },
  {
    name: 'Assigned bugs',
    navPath: 'DASH_LIST',
    filter: {assigned: true},
  },
  {
    name: 'Overdue bugs',
    navPath: 'DASH_LIST',
    icon: 'alert-circle-outline',
    filter: {overdue: true},
  },
  {
    name: 'Bugs this week',
    navPath: 'DASH_LIST',
    icon: 'calendar-outline',
    filter: {thisWeek: true},
  },
  {
    name: 'Team updates',
    icon: 'account-group-outline',
    navPath: 'DASH_LIST',
  },
];

export default DashList;
