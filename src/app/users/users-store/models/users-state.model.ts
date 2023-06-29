import { UserData } from '../../models/user-data.model';

export interface UsersState {
  users: UserData[],
  error: null | string,
  isLoading: boolean,
}
