import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUsers } from '../users-store/users.action';
import { UserData } from '../models/user-data.model';
import { selectLoading, selectUsers } from '../users-store/users.selectors';

@Injectable({
  providedIn: 'root',
})
export class UsersFacadeService {
  public users$ = this.store$.select(selectUsers);
  public isLoading$ = this.store$.select(selectLoading);

  constructor(private store$: Store) {
  }

  public addUsers(users: UserData[]): void {
    this.store$.dispatch(getUsers({ users }));
  }
}
