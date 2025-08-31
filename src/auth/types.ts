import { IUser } from 'src/types/user';

export type AuthState = {
  user: IUser | null;
  loading: boolean;
};

export type AuthContextValue = {
  user: IUser | null;
  loading: boolean;
  authenticated: boolean;
  unauthenticated: boolean;
  checkUserSession?: () => Promise<void>;
};
