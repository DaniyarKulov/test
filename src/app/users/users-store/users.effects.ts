import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  catchError, map, of, switchMap,
} from 'rxjs';
import { UsersHttpService } from '../services/users-http.service';
import { getLoading, getUsersFailure, getUsersSuccess } from './users.action';


@Injectable()
export class UsersEffects {
  public getUsers$ = createEffect(() => this.actions$.pipe(
    ofType(getLoading),
    switchMap(() => this.usersHttpService.users.pipe(
      map((users) => getUsersSuccess({ users })),
      catchError(({ message }) => of(getUsersFailure(message))),
    )),
  ));

  constructor(private actions$: Actions, private usersHttpService: UsersHttpService) {}
}
