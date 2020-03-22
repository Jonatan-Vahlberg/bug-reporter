import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from 'src/navigation';
import {View, TouchableOpacity, StyleSheet} from 'react-native';
import {Text} from 'src/components/common/Text';
import metrics from 'src/static/metrics';
import {Divider} from 'react-native-paper';
import colors from 'src/static/colors';

const NavSubBar: React.FC<{
  navigation: StackNavigationProp<TeamsParamList>;
  position: 'LIST' | 'ADMIN';
}> = ({navigation, position}) => {
  const isList = position === 'LIST';
  return (
    <View style={styles.itemList}>
      <TouchableOpacity
        disabled={isList}
        onPress={() => navigation.navigate('TEAMS_HOME')}>
        <View style={styles.item}>
          <Text.Title
            style={{color: position ? colors.darkerBasicBlue : '#000'}}>
            Your Teams
          </Text.Title>
        </View>
      </TouchableOpacity>
      <View style={styles.divider} />
      <TouchableOpacity
        disabled={!isList}
        onPress={() => navigation.navigate('TEAMS_ADMIN')}>
        <View style={styles.item}>
          <Text.Title
            style={{color: position ? colors.darkerBasicBlue : '#000'}}>
            Admin
          </Text.Title>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  itemList: {
    flexDirection: 'row',
    width: metrics.screenWidth,
    height: 50,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  item: {
    flexDirection: 'row',
    width: '100%',
  },
  divider: {
    width: 2,
    backgroundColor: '#000',
    height: '100%',
  },
});

export default NavSubBar;
