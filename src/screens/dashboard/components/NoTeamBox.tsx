import * as React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {Button} from 'src/components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {DashboardParamList} from 'src/navigation';

interface NoTeamBoxProps {
  navigation: StackNavigationProp<DashboardParamList>;
}

const NoTeamBox = (props: NoTeamBoxProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>
        No team has been selected to be featured you create/join teams in the
        teams section.
      </Text>
      <Text style={{...styles.textStyle, marginTop: 0}}>
        The application is built upon a team based structure and requires a team
        to acces certain core features.
      </Text>
      <View style={styles.buttonStyle}>
        <Button action={() => props.navigation.navigate('TEAMS_ADMIN')}>
          <Text style={[styles.buttonTextStyle]}>Go to teams admin</Text>
        </Button>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  textStyle: {
    marginHorizontal: 30,
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    marginVertical: 20,
  },
  buttonStyle: {
    marginLeft: 30,
    marginRight: 55,
  },
  buttonTextStyle: {
    color: 'white',
    margin: 0,
    fontSize: 20,
  },
});

export default NoTeamBox;
