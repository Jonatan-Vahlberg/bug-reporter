export default interface TeamMember {
  name: string;
  uuid: string;
  position: TeamPosition;
  positonValue: number;
}

export const enum TeamPosition {
  DEVELOPER,
  TECH_LEAD,
  ADMIN,
  TESTER,
  OTHER,
}
