export default interface Comment {
  uuid: string;
  content: string[];
  senderName: string;
  senderUuid: string;
  date: string;
  action?: 'CLOSED' | 'REOPENED' | null;
}
