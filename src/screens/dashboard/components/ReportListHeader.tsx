import * as React from 'react';
import Colors from 'src/static/colors';
import {Text} from 'src/components/common';
import {Avatar} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {ScrollView} from 'react-native-gesture-handler';

type HeaderProps = {naviagtion: StackNavigationProp<DashboardParamList>};

const ReportListHeader: React.FC<HeaderProps> = ({naviagtion}) => {
  return (
    <View>
      <ScrollView horizontal></ScrollView>
    </View>
  );
};

export default DashHeader;
