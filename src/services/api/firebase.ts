import TeamMember from '../../models/TeamMember';
import Profile from '../..//models/Profile';
import BugReport from '../..//models/BugReport';
import Comment from '../..//models/Comment';
import axios from 'axios';
import Team from 'src/models/Team';
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
  getProfile: async (uid: string) => {
    try {
      const ref = firebaseApp.database().ref(`/users/${uid}`);
      const snapshot = await ref.once('value');

      return {snapshot, error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.error(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_GET_PROFILE};
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
      const team: Team = {
        uuid: teamId,
        name,
        description,
        members: [
          {
            name: `${creator.firstName} ${creator.lastName}`,
            position: 'ADMIN',
            positonValue: 5,
            uuid: creator.uuid,
          },
        ],
        reports: teamId,
        public: isPublic,
        code: getRandomCode(),
      };
      console.log(team);

      const userRef = firebaseApp.database().ref(`/users/${creator.uuid}`);
      const teamRef = firebaseApp.database().ref(`/teams/${teamId}`);
      await teamRef.set(team);
      await userRef.update({
        teams: [...creator.teams, teamId],
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
            console.log(value);
            return {
              error: firebaseDBErrorStatus.NO_ERROR,
              payload: value[Object.keys(value)[0]],
            };
          }
        });
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
    const newTeams: string[] = [...profile.teams, team.uuid];
    try {
      const userRef = firebaseApp.database().ref(`/users/${profile.uuid}`);
      const teamRef = firebaseApp.database().ref(`/teams/${team.uuid}`);
      await teamRef.update({...team, members: [...team.members, newMember]});
      await userRef.update({teams: newTeams});
      return {error: firebaseDBErrorStatus.NO_ERROR};
    } catch (error) {
      console.warn(error.message);
      return {error: firebaseDBErrorStatus.UNABLE_TO_CREATE_TEAM};
    }
  },
  createReport: async (report: BugReport, teamId: string) => {
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
      console.log('HI');
      const ref = firebaseApp.database().ref(`reports/${teamId}`);
      const snap = await ref.once('value');
      if (!snap.exists()) {
        return [];
      }
      console.log(snap.val());

      return _.values(snap.val());
    } catch (error) {
      console.warn(error);
      return [];
    }
  },
  updateReport: async (report: BugReport) => {
    //TODO: FIREBASE
  },
  addCommentToReport: async (
    report: BugReport,
    comment: Comment,
    closing: boolean = false,
  ) => {
    //TODO: FIREBASE
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
