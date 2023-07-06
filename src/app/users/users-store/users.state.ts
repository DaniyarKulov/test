import { UsersState } from './models/users-state.model';

export const initialUsersState:UsersState = {
  sortCriteria: {
    active: '',
    direction: '',
  },
  users: [],
  error: null,
  isLoading: false,
};
