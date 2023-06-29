import { createAction, props } from '@ngrx/store';
import { Features } from './enums/features';
import { UserData } from '../models/user-data.model';

export const getUsers = createAction(`[${Features.Users}] get users`, props<{ users: UserData[] }>());

export const getUsersSuccess = createAction(
  `[${Features.Users}] get users success`,
  props<{
    users: UserData[]
  }>(),
);

export const getUsersFailure = createAction(
  `[${Features.Users}] get users failure`,
  props<{
    error: string | null
  }>(),
);
