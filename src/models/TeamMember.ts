export default interface TeamMember {
  name: string;
  uuid: string;
  position: TeamPosition;
  positonValue: number;
  mail: string;
  fcmid: string;
}

export type TeamPosition =
  | 'DEVELOPER'
  | 'TECH_LEAD'
  | 'ADMIN'
  | 'TESTER'
  | 'CONSULTANT'
  | 'OTHER';
