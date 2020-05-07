import TeamMember from '../../models/TeamMember';
import Profile from '../..//models/Profile';
import BugReport from '../..//models/BugReport';
import Comment from '../..//models/Comment';
import axios from 'axios';
import Team, {LightTeam} from 'src/models/Team';
import firebaseApp from 'firebase';
import _ from 'lodash';
import {getRandomCode} from 'src/static/functions';

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

// export interface ApiFirebaseInterface {
//   login: (email: string, password: string) => Promise<FirebaseAuthReturn>;
//   register: (
//     email: string,
//     password: string,
//     firstName: string,
//     lastName: string,
//   ) => Promise<FirebaseAuthReturn>;
//   logout: (profile: Profile) => Promise<void>;
//   getProfile: (uuid: string, email: string) => Promise<FirebaseDBReturn>;
//   joinTeamWithCode: (code: string, user: Profile) => Promise<FirebaseDBReturn>;
//   createTeam: (
//     name: string,
//     description: string,
//     creator: Profile,
//     members?: TeamMember[],
//   ) => Promise<FirebaseDBReturn>;
//   createReport: (
//     report: BugReport,
//     teamId: string,
//   ) => Promise<FirebaseDBReturn>;
//   getReport: (uuid: string) => Promise<FirebaseDBReturn>;
//   getReports: (teamId: string) => Promise<any>;
//   updateReport: (report: BugReport) => Promise<void>;
//   addCommentToReport: (
//     report: BugReport,
//     comment: Comment,
//     closing?: boolean,
//   ) => Promise<void>;
//   editCommentOnReport: (
//     report: BugReport,
//     newComment: Comment,
//     closing?: boolean,
//   ) => Promise<void>;
// }

const firebase = {
  login: async (email: string, password: string) => {
    try {
      const {
        user: {uid},
      }: any = await firebaseApp
        .auth()
        .signInWithEmailAndPassword(email, password);
      return {uid, error: firebaseAuthErrorStatus.NO_ERROR};
    } catch (error) {
      console.error(error.message);
      return {uid: '', error: firebaseAuthErrorStatus.NO_USER};
    }
  },
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    try {
      const {
        user: {uid},
      }: any = await firebaseApp
        .auth()
        .createUserWithEmailAndPassword(email, password);
      return {uid, error: firebaseAuthErrorStatus.NO_ERROR};
    } catch (error) {
      console.error(error.message);
      return {uid: '', error: firebaseAuthErrorStatus.UNABLE_TO_REGISTER};
    }
  },
  logout: async (profile: Profile) => {
    //TODO: FIREBASE UNREGISTER DEVICEIDS
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
  getTeamWithCode: async (code: string) => {
    try {
      const teamsRef = firebaseApp.database().ref(`/teams`);
      await teamsRef
        .orderByChild('code')
        .equalTo(code)
        .on('value', async queryResult => {
          if (queryResult.exists()) {
            const value = queryResult.val();
            let team = value[Object.keys(value)[0]];
            team.members = _.values(team.members);
            return {
              error: firebaseDBErrorStatus.NO_ERROR,
              payload: team,
            };
          }
        });
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
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
  joinTeam: async (code: string, profile: Profile, team: Team) => {
    const newMember: TeamMember = {
      name: `${profile.firstName} ${profile.lastName}`,
      position: 'OTHER',
      positonValue: 1,
      uuid: profile.uuid,
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
      await teamMembersRef.update(newMember);
      await userRef.set(team);
      return {error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    }
  },
  removeTeamFully: async (team: Team) => {
    try {
      const teamRef = firebaseApp.database().ref(`/teams/${team.uuid}`);
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
  leaveTeam: async (team: Team, profile: Profile) => {
    try {
      const profileTeamRef = firebaseApp
        .database()
        .ref(`/users/${profile.uuid}/teams/${team.uuid}`);
      const membersRef = firebaseApp
        .database()
        .ref(`/teams/${team.uuid}/members/${profile.uuid}`);
      await profileTeamRef.remove();
      await membersRef.remove();
      return true;
    } catch (error) {
      console.warn(error);
      return false;
    }
  },
  createReport: async (report: BugReport, teamId: string) => {
    console.log(report);

    try {
      const reportRef = firebaseApp
        .database()
        .ref(`reports/${teamId}/${report.uuid}`);
      await reportRef.set({
        ...report,
      });
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
      const result = ref.on('value', snap => {
        if (!snap.exists() || snap.val() === null) {
          setReports([]);
        } else {
          setReports(_.values(snap.val()));
        }
      });
    } catch (error) {
      console.warn(error);
      setReports([]);
    }
  },
  updateReport: async (report: BugReport) => {
    //TODO: FIREBASE
  },
  addCommentToReport: async (
    report: BugReport,
    teamId: string,
    comment: Comment,
    closed: boolean,
  ) => {
    try {
      const ref = firebaseApp
        .database()
        .ref(`reports/${teamId}/${report.uuid}/comments/${comment.uuid}`);
      await ref.set({
        ...comment,
      });
      return {error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
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
