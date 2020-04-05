import React, {useState, useEffect, useContext} from 'react';
import Team from '../../models/Team';
import {
  Navbar,
  Text,
  LargeSpinner,
  ProtectedView,
} from '../../components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {firebaseDBErrorStatus} from 'src/services/api/firebase';
import {View, StyleSheet, ScrollView} from 'react-native';
import colors from 'src/static/colors';
import {Card, DataTable, Button} from 'react-native-paper';
import MemberRow from './components/MemberRow';
import metrics from 'src/static/metrics';

export interface DetailProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_DETAIL'>;
}

const TeamDetailScreen: React.FC<DetailProps> = ({navigation, route}) => {
  const {actions} = useContext(ApplicationContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [team, setTeam] = useState<Team>();
  const [nameSort, setNameSort] = useState<'ascending' | 'descending'>(
    'ascending',
  );
  const teamBase = route.params.teamBase;
  useEffect(() => {
    (async () => {
      const result = await actions.firebase.getTeanOnId(teamBase.uuid);
      if (result.error === firebaseDBErrorStatus.NO_ERROR) {
        setTeam(result.payload);
      }
      setLoading(false);
    })();
  }, [teamBase]);

  return (
    <View style={styles().base}>
      <Navbar navigation={navigation} title={teamBase.name} root={false} />

      {loading ? (
        <LargeSpinner message="Loading team" />
      ) : (
        <View>
          {team !== undefined && (
            <View>
              <Text.Base>{team.description}</Text.Base>
              <ProtectedView
                userLevel={teamBase.personalPositionValue}
                minLevel={4}>
                <Text.Base>Public code: {team.code} </Text.Base>
              </ProtectedView>
              <Card style={styles().cardBase}>
                <Card.Title title="Members" />
                <DataTable>
                  <DataTable.Header>
                    <DataTable.Title
                      sortDirection={nameSort}
                      onPress={() =>
                        setNameSort(
                          nameSort === 'ascending' ? 'descending' : 'ascending',
                        )
                      }>
                      Member
                    </DataTable.Title>
                    <DataTable.Title>Role</DataTable.Title>
                    <DataTable.Title numeric>Premission</DataTable.Title>
                    <DataTable.Title> </DataTable.Title>
                  </DataTable.Header>
                  <ScrollView>
                    {team.members.map((member) => {
                      return (
                        <MemberRow
                          premissionLevel={teamBase.personalPositionValue}
                          key={member.uuid}
                          member={member}
                        />
                      );
                    })}
                  </ScrollView>
                </DataTable>
              </Card>
              <ProtectedView
                userLevel={teamBase.personalPositionValue}
                minLevel={5}>
                <Button
                  onPress={async () => {
                    const allRemoved = await actions.firebase.removeTeamFully(
                      team,
                    );
                    if (allRemoved) {
                      navigation.goBack();
                    }
                  }}
                  color={'#fff'}
                  style={[
                    styles().button,
                    {backgroundColor: colors.redHighlight},
                  ]}>
                  Disband Team
                </Button>
              </ProtectedView>
              <ProtectedView
                userLevel={teamBase.personalPositionValue}
                minLevel={0}
                maxLevel={4}>
                <Button
                  onPress={async () => {}}
                  color={'#fff'}
                  style={styles().button}>
                  Leave Team
                </Button>
              </ProtectedView>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = () =>
  StyleSheet.create({
    base: {
      flex: 1,
    },
    cardBase: {
      maxHeight: metrics.screenHeight * 0.5,
      paddingVertical: 15,
      marginHorizontal: 20,
      marginVertical: 20,
    },
    button: {
      marginHorizontal: 20,
      borderRadius: 10000,
      backgroundColor: colors.darkerBasicBlue,
      marginTop: 20,
    },
  });

export default TeamDetailScreen;
