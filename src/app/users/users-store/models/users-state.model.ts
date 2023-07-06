import { Sort } from '@angular/material/sort';
import { UserData } from '../../models/user-data.model';

export interface UsersState {
  users: UserData[],
  sortCriteria:Sort,
  error: null | string,
  isLoading: boolean,
}
