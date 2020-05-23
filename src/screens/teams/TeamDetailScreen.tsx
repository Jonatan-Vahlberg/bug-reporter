import React, {useState, useEffect, useContext} from 'react';
import Team from '../../models/Team';
import {
  Navbar,
  Text,
  LargeSpinner,
  ProtectedView,
  ModalConfirm,
} from '../../components/common';
import {StackNavigationProp} from '@react-navigation/stack';
import {TeamsParamList} from '../../navigation';
import {RouteProp} from '@react-navigation/native';
import {ApplicationContext} from 'src/context/ApplicationContext';
import {firebaseDBErrorStatus} from 'src/services/api/firebase';
import {View, StyleSheet, ScrollView} from 'react-native';
import colors from 'src/static/colors';
import {
  Card,
  DataTable,
  Button,
  TextInput,
  HelperText,
} from 'react-native-paper';
import MemberRow from './components/MemberRow';
import metrics from 'src/static/metrics';
import SendInviteModal from './components/SendInviteModal';
import MemberModal from './components/MemberModal';
import TeamMember from 'src/models/TeamMember';

export interface DetailProps {
  navigation: StackNavigationProp<TeamsParamList>;
  route: RouteProp<TeamsParamList, 'TEAMS_DETAIL'>;
}

const TeamDetailScreen: React.FC<DetailProps> = ({navigation, route}) => {
  const {actions, profile, settings} = useContext(ApplicationContext);
  const [loading, setLoading] = useState<boolean>(true);
  const [team, setTeam] = useState<Team>();
  const [nameSort, setNameSort] = useState<'ascending' | 'descending'>(
    'ascending',
  );
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const [chosenMember, setChosenMember] = useState<TeamMember>();
  const [updateMade, setUpdateMade] = useState<boolean>(true);
  const teamBase = route.params.teamBase;
  useEffect(() => {
    (async () => {
      if (updateMade) {
        const result = await actions.firebase.getTeanOnId(teamBase.uuid);
        if (result.error === firebaseDBErrorStatus.NO_ERROR) {
          setTeam(result.payload);
          setUpdateMade(false);
        }
      }
      setLoading(false);
    })();
  }, [teamBase, updateMade]);
  console.log(team);

  return (
    <View style={styles().base}>
      <Navbar navigation={navigation} title={teamBase.name} root={false} />

      {loading ? (
        <LargeSpinner message="Loading team" />
      ) : (
        <View>
          {team !== undefined && (
            <View>
              <Card
                style={{
                  ...styles().cardBase,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: 5,
                }}>
                <Text.Caption>Description</Text.Caption>
                <Text.Base>{team.description}</Text.Base>

                <ProtectedView
                  userLevel={teamBase.personalPositionValue}
                  minLevel={4}>
                  <Text.Caption>Team code</Text.Caption>
                  <Text.Base>Code: {team.code} </Text.Base>
                </ProtectedView>
              </Card>
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
                    {team.members.map(member => {
                      console.log(member);

                      return (
                        <MemberRow
                          premissionLevel={member.positonValue}
                          key={member.uuid}
                          member={member}
                          personalPremissionLevel={
                            teamBase.personalPositionValue
                          }
                          setChosenMember={setChosenMember}
                        />
                      );
                    })}
                  </ScrollView>
                </DataTable>
              </Card>
              <ProtectedView
                userLevel={teamBase.personalPositionValue}
                minLevel={4}>
                <Button
                  onPress={() => setModalVisible(true)}
                  color={'#fff'}
                  style={[styles().button]}>
                  Invite to team
                </Button>
              </ProtectedView>
              <ProtectedView
                userLevel={teamBase.personalPositionValue}
                minLevel={5}>
                <Button
                  onPress={async () => {
                    if (team.uuid === settings.feautredTeamId) {
                      actions.setters.setFeaturedTeam!(undefined);
                      actions.storage.setSettings({
                        ...settings,
                        feautredTeamId: 'UNSET',
                      });
                    }
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
                  onPress={async () => {
                    if (team.uuid === settings.feautredTeamId) {
                      actions.setters.setFeaturedTeam!(undefined);
                      actions.storage.setSettings({
                        ...settings,
                        feautredTeamId: 'UNSET',
                      });
                    }
                    const leftTeam = await actions.firebase.leaveTeam(
                      team.uuid,
                      profile!.uuid,
                    );
                    if (leftTeam) {
                      navigation.goBack();
                    }
                  }}
                  color={'#fff'}
                  style={styles().button}>
                  Leave Team
                </Button>
              </ProtectedView>
            </View>
          )}
          {chosenMember && (
            <MemberModal
              teamMember={chosenMember}
              teamUuid={team!.uuid}
              visible={true}
              setTeamMember={setChosenMember}
              setUpdateMade={setUpdateMade}
            />
          )}
        </View>
      )}
      <SendInviteModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        team={team!}
      />
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
    modalTextBox: {
      alignItems: 'center',
    },
  });

export default TeamDetailScreen;
