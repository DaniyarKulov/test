import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap,
} from 'rxjs';
import { UsersHttpService } from '../services/users-http.service';
import {
  getSortCriteria, getSortCriteriaSuccess, getSortCriteriaFailure,
} from './users.action';
import { SortUsersService } from '../services/sort-users.service';


@Injectable()
export class UsersEffects {
  public getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(getSortCriteria),
    switchMap(({ sortCriteria }) => this.usersHttpService.users.pipe(
      map((users) => this.sortUsersService.sortedUsers(users, sortCriteria)),
      map((users) => getSortCriteriaSuccess({ users })),
      catchError(({ message }) => of(getSortCriteriaFailure(message))),
    )),
  ));

  constructor(
    private actions$: Actions,
    private usersHttpService: UsersHttpService,
    private sortUsersService:SortUsersService,
  ) {}
}
