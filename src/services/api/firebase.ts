import TeamMember, {TeamPosition} from '../../models/TeamMember';
import Profile from '../..//models/Profile';
import BugReport from '../..//models/BugReport';
import Comment from '../..//models/Comment';
import axios from 'axios';
import Team, {LightTeam} from 'src/models/Team';
import firebaseApp, {User} from 'firebase';
import _ from 'lodash';
import {getRandomCode} from 'src/static/functions';
import NotificationsFCM from './notificationFCM';
import notificationFunctions from 'src/static/functions/notificationFunctions';

const UUID_V4 = require('uuid/v4');
export enum firebaseAuthErrorStatus {
  'NO_USER',
  'UNABLE_TO_REGISTER',
  'NO_ERROR',
}

export enum firebaseDBErrorStatus {
  'UNABLE_TO_GET_PROFILE',
  'UNABLE_TO_UPDATE_PROFILE',
  'NO_ERROR',
  'UNABLE_TO_CREATE_TEAM',
}

export type FirebaseAuthReturn = {
  uid: string;
  error: firebaseAuthErrorStatus;
};

export type FirebaseDBReturn = {
  error: firebaseDBErrorStatus;
  snapshot?: any;
};

const firebase = {
  login: async (email: string, password: string) => {
    try {
      const {user: user} = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);
      console.log(user);

      if (user !== null) {
        return {uid: user.uid, error: false};
      }
      return {uid: undefined, error: true};
    } catch (error) {
      console.warn(error.message);
      return {uid: undefined, error: true};
    }
  },
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    FCMID: string,
  ): Promise<{profile: Profile | undefined; error: boolean}> => {
    try {
      const {user} = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
      if (user !== null) {
        const profile: Profile = {
          email,
          firstName,
          lastName,
          uuid: user.uid,
          teams: [],
          FCMID,
        };
        await firebaseApp
          .database()
          .ref('users')
          .child(user.uid)
          .set({
            email,
            firstName,
            lastName,
            uuid: user.uid,
          });
        return {profile, error: false};
      }
      return {profile: undefined, error: true};
    } catch (error) {
      console.warn(error.message);
      return {profile: undefined, error: true};
    }
  },
  logout: async (profile: Profile) => {
    try {
      const result = await firebaseApp
        .database()
        .ref(`users/${profile.uuid}/FCMID`)
        .remove();
      return;
    } catch (error) {
      console.warn(error);
      return;
    }
  },
  updateProfile: async (profile: Profile) => {
    try {
      const reworkedTeams = _.mapValues(_.keyBy(profile.teams, 'uuid'));
      console.log(reworkedTeams);

      const result = await firebaseApp
        .database()
        .ref(`users/${profile.uuid}`)
        .update({...profile, teams: reworkedTeams});
      return;
    } catch (error) {
      console.warn(error);
      return;
    }
  },
  getProfile: async (
    uid: string,
    setProfile: React.Dispatch<React.SetStateAction<Profile | undefined>>,
  ) => {
    try {
      const ref = firebaseApp.database().ref(`/users/${uid}`);
      ref.on('value', snapshot => {
        if (snapshot.exists()) {
          let profile: Profile = snapshot.val();
          profile.teams = _.values(snapshot.val().teams);
          console.log(profile);

          setProfile(profile);
        } else {
          setProfile(undefined);
        }
      });
    } catch (error) {
      console.error(error.message);
      return setProfile(undefined);
    }
  },
  createTeam: async (
    name: string,
    description: string,
    isPublic: boolean,
    creator: Profile,
  ) => {
    try {
      const teamId: string = UUID_V4();
      const team = {
        uuid: teamId,
        name,
        description,
        members: {
          [creator.uuid]: {
            name: `${creator.firstName} ${creator.lastName}`,
            position: 'ADMIN',
            positonValue: 5,
            uuid: creator.uuid,
            mail: creator.email,
            fcmid: creator.FCMID,
          },
        },
        reports: teamId,
        public: isPublic,
        code: getRandomCode(),
      };

      const userRef = firebaseApp
        .database()
        .ref(`/users/${creator.uuid}/teams/${teamId}`);
      const teamRef = firebaseApp.database().ref(`/teams/${teamId}`);
      await teamRef.set(team);
      await userRef.set({
        uuid: teamId,
        personalPosition: 'ADMIN',
        personalPositionValue: 5,
        name: team.name,
      });

      return {error: firebaseDBErrorStatus.NO_ERROR, payload: teamId};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    }
  },
  getTeamWithCode: async (
    code: string,
    profile: Profile,
    joinTeam: (profile: Profile, team: Team) => Promise<any>,
  ): Promise<Team | undefined> => {
    let resultValue = false;
    let ResultTeam: Team | undefined = undefined;
    try {
      const teamsRef = firebaseApp.database().ref(`/teams`);
      teamsRef
        .orderByChild('code')
        .equalTo(code)
        .on('value', async queryResult => {
          if (queryResult.exists()) {
            const value = queryResult.val();

            let team: Team = value[Object.keys(value)[0]];
            team.members = _.values(team.members);
            console.log('JOIN VALUE', team);
            await joinTeam(profile, team);
            return team;
          }
        });
      return undefined;
    } catch (error) {
      console.warn(error.message);
      return undefined;
    }
  },
  getTeanOnId: async (uuid: string) => {
    try {
      const teamRef = firebaseApp.database().ref(`/teams/${uuid}`);
      const result = await teamRef.once('value');
      if (result.exists()) {
        let team = result.val();
        team.members = _.values(team.members);
        return {error: firebaseDBErrorStatus.NO_ERROR, payload: team};
      }
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    }
  },
  joinTeam: async (profile: Profile, team: Team) => {
    const newMember: TeamMember = {
      name: `${profile.firstName} ${profile.lastName}`,
      position: 'OTHER',
      positonValue: 1,
      uuid: profile.uuid,
      mail: profile.email,
      fcmid: profile.FCMID,
    };
    const lightTeam: LightTeam = {
      uuid: team.uuid,
      name: team.name,
      personalPosition: 'OTHER',
      personalPositionValue: 1,
    };
    const newTeams: LightTeam[] = [...profile.teams, lightTeam];
    try {
      const userRef = firebaseApp
        .database()
        .ref(`/users/${profile.uuid}/teams/${team.uuid}`);
      const teamMembersRef = firebaseApp
        .database()
        .ref(`/teams/${team.uuid}/members/${profile.uuid}`);
      await teamMembersRef.set(newMember);
      await userRef.set(lightTeam);
      return {error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    }
  },
  sendInviteForTeam: async (team: Team, email: string, senderName: string) => {
    try {
      const usersRef = firebaseApp.database().ref(`/users`);
      usersRef
        .orderByChild('email')
        .equalTo(email)
        .on('value', snap => {
          const values = _.values(snap.val());
          if (values.length === 1) {
            const user: Profile = values[0];
            if (user.FCMID !== undefined) {
              NotificationsFCM.sendTeamFCM(senderName, [user.FCMID], team);
            }
          }
        });
      return true;
    } catch (error) {
      console.warn(error);

      return false;
    }
  },
  removeTeamFully: async (team: Team) => {
    try {
      const teamRef = firebaseApp.database().ref(`/teams/${team.uuid}`);
      const reportsRef = firebaseApp.database().ref(`reports/${team.uuid}`);
      await reportsRef.remove();
      team.members.forEach(async member => {
        const memberTeamRef = firebaseApp
          .database()
          .ref(`/users/${member.uuid}/teams/${team.uuid}`);
        await memberTeamRef.remove();
      });
      await teamRef.remove();
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
  leaveTeam: async (teamUuid: string, uuid: string) => {
    try {
      const profileTeamRef = firebaseApp
        .database()
        .ref(`/users/${uuid}/teams/${teamUuid}`);
      const membersRef = firebaseApp
        .database()
        .ref(`/teams/${teamUuid}/members/${uuid}`);
      await profileTeamRef.remove();
      await membersRef.remove();
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },

  changeMembersPosition: async (
    teamUuid: string,
    member: TeamMember,
    newPosition: {value: number; position: TeamPosition},
  ) => {
    try {
      const profileTeamRef = firebaseApp
        .database()
        .ref(`/users/${member.uuid}/teams/${teamUuid}`);
      const membersRef = firebaseApp
        .database()
        .ref(`/teams/${teamUuid}/members/${member.uuid}`);
      await membersRef.update({
        position: newPosition.position,
        positonValue: newPosition.value,
      });
      await profileTeamRef.update({
        personalPosition: newPosition.position,
        personalPositionValue: newPosition.value,
      });
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
  createReport: async (report: BugReport, recivers: string[], team: Team) => {
    console.log(report);

    try {
      const reportRef = firebaseApp
        .database()
        .ref(`reports/${team.uuid}/${report.uuid}`);
      await reportRef.set({
        ...report,
      });
      await NotificationsFCM.sendReportFCM(
        report.reportedBy!,
        recivers,
        'NEW',
        report,
        team,
      );
      return {error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    }
  },
  getReport: async (uuid: string) => {
    try {
      const ref = firebaseApp.database().ref(`reports/${uuid}`);
      const snapshot = await ref.once('value');

      return {snapshot, error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.error(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_UPDATE_PROFILE};
    }
  },
  getReports: async (teamId: string): Promise<BugReport[]> => {
    try {
      const ref = firebaseApp.database().ref(`reports/${teamId}`);
      const snap = await ref.once('value');
      if (!snap.exists() || snap.val() === null) {
        return [];
      }

      return _.values(snap.val());
    } catch (error) {
      console.warn(error);
      return [];
    }
  },
  getRealtimeReports: async (
    teamId: string,
    setReports: React.Dispatch<React.SetStateAction<BugReport[]>>,
  ) => {
    try {
      const ref = firebaseApp.database().ref(`reports/${teamId}`);
      ref.on('value', snap => {
        console.log('SNAP', snap);

        if (!snap.exists() || snap.val() === null) {
          setReports([]);
        } else {
          setReports(_.values(snap.val()));
        }
      });
    } catch (error) {
      console.warn('ERROR: ', error);
      setReports([]);
    }
  },
  updateReport: async (report: BugReport, team: Team) => {
    //TODO: FIREBASE
  },
  addCommentToReport: async (
    report: BugReport,
    team: Team,
    comment: Comment,
    changedCloseStatus: boolean,
    sender: Profile,
  ) => {
    try {
      const reportRef = firebaseApp
        .database()
        .ref(`reports/${team.uuid}/${report.uuid}`);
      const commentRef = reportRef.child(`/comments/${comment.uuid}`);
      await commentRef.set({
        ...comment,
      });
      if (changedCloseStatus) {
        reportRef.update({
          closed: !report.closed,
        });
      }
      const recivers = notificationFunctions.getFCMIDsFromTeamMebers(
        team,
        sender,
      );
      NotificationsFCM.sendReportFCM(
        report.reportedBy!,
        recivers,
        'UPDATE',
        report,
        team,
      );
      return true;
    } catch (error) {
      console.warn(error.message);
      return false;
    }
  },
  editCommentOnReport: async (
    report: BugReport,
    newComment: Comment,
    closing: boolean = false,
  ) => {
    const updatedComments = report.comments!.map(comment => {
      if (comment.uuid === newComment.uuid) {
        return newComment;
      }
      return comment;
    });
    const updatedReport: BugReport = {
      ...report,
      comments: updatedComments,
      closed: closing,
    };
    //TODO: FIREBASE
  },
};

export default firebase;
