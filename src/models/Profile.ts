import {LightTeam} from './Team';

export default interface Profile {
  firstName: string;
  lastName: string;
  email: string;
  uuid: string;
  FCMIDS: string[];
  teams: LightTeam[];
}
