import {ActionString} from './BugReport';

export default interface Comment {
  uuid: string;
  content: string[];
  senderName: string;
  senderUuid: string;
  date: string;
  action?: ActionString;
}
