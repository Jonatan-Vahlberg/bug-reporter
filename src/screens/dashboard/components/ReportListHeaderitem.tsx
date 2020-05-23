import * as React from 'react';
import Colors from 'src/static/colors';
import {Text} from 'src/components/common';
import {Avatar} from 'react-native-paper';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';
import {View} from 'react-native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {ScrollView} from 'react-native-gesture-handler';

type ItemProps = {
  name: string;
  applied: boolean | null;
  icon: string;
  changeValue: Function;
};

const ReportListHeader: React.FC<ItemProps> = ({name, applied, icon}) => {
  return <View></View>;
};

export default DashHeader;
