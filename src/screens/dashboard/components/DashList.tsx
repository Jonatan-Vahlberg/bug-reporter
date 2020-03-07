import * as React from 'react';
import Colors from 'src/static/colors';
import {Text} from 'src/components/common';
import {Avatar} from 'react-native-paper';
import {FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import DashListItem, {ListItem} from './DashListItem';
import {TouchableOpacity} from 'react-native-gesture-handler';

type HeaderProps = {naviagtion: StackNavigationProp<DashboardParamList>};

const DashList: React.FC<HeaderProps> = () => {
  return (
    <ApplicationContext.Consumer>
      {context => {
        const {profile, featuredTeam} = context;
        return (
          <View
            style={{
              width: '100%',
              paddingVertical: 10,
              backgroundColor: Colors.backGroundColor,
              marginVertical: 15,
              flex: 1,
            }}>
            <FlatList
              data={listItems}
              keyExtractor={(item, index) => index + ''}
              renderItem={({item, index}) => (
                <TouchableOpacity>
                  <DashListItem item={item} />
                </TouchableOpacity>
              )}
            />
          </View>
        );
      }}
    </ApplicationContext.Consumer>
  );
};

const listItems: ListItem[] = [
  {
    name: 'All bugs',
    icon: 'bug-outline',
    navPath: 'DASH_VIEW',
  },
  {
    name: 'Assigned bugs',
    navPath: 'DASH_VIEW',
  },
  {
    name: 'Overdue bugs',
    navPath: 'DASH_VIEW',
  },
  {
    name: 'Bugs this week',
    navPath: 'DASH_VIEW',
    icon: 'calendar-outline',
  },
  {
    name: 'Team updates',
    navPath: 'DASH_VIEW',
  },
];

export default DashList;
