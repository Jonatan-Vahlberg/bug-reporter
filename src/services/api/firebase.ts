import TeamMember from '../../models/TeamMember';
import Profile from '../..//models/Profile';
import BugReport from '../..//models/BugReport';
import Comment from '../..//models/Comment';

export interface ApiFirebaseInterface {
  login: (email: string, password: string) => Promise<void>;
  register: (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => Promise<void>;
  getProfile: (uuid: string, email: string) => Promise<void>;
  logout: (profile: Profile) => Promise<void>;
  joinTeam: (code: string, user: Profile) => Promise<void>;
  createTeam: (
    name: string,
    description: string,
    createrUUID: string,
    members?: TeamMember[],
  ) => Promise<void>;
  createReport: (report: BugReport) => Promise<void>;
  updateReport: (report: BugReport) => Promise<void>;
  addCommentToReport: (
    report: BugReport,
    comment: Comment,
    closing?: boolean,
  ) => Promise<void>;
  editCommentOnReport: (
    report: BugReport,
    newComment: Comment,
    closing?: boolean,
  ) => Promise<void>;
}

const firebase: ApiFirebaseInterface = {
  login: async (email: string, password: string) => {
    //TODO: FIREBASE
  },
  register: async (
    email: string,
    password: string,
    firstName: string,
    lastName: string,
  ) => {
    //TODO: FIREBASE
  },
  getProfile: async (uuid: string, email: string) => {
    //TODO: FIREBASE
  },
  logout: async (profile: Profile) => {
    //TODO: FIREBASE UNREGISTER DEVICEIDS
  },
  createTeam: async (
    name: string,
    description: string,
    createrUUID: string,
    members?: TeamMember[],
  ) => {
    //TODO: FIREBASE
  },
  joinTeam: async (code: string, user: Profile) => {
    //TODO: FIREBASE
  },
  createReport: async (report: BugReport) => {
    //TODO: FIREBASE
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
