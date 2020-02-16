import Profile from '../models/Profile';

export default interface ProfileActions {
  registerUser: (
    email: string,
    password: string,
    setLocalState?: Function,
  ) => Promise<void>;
  getProfile: (uuid: string) => Promise<void>;
  createProfile: (profile: Profile) => Promise<void>;
  updateProfile: (updatedProfile: Profile) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
