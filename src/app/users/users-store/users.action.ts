import { createAction, props } from '@ngrx/store';
import { Sort } from '@angular/material/sort';
import { UserActions } from './constants/users-actions';
import { UserData } from '../models/user-data.model';
import { SortActions } from './constants/sort-actions';

export const getLoading = createAction(UserActions.GetUsers);

export const getUsersSuccess = createAction(
  UserActions.GetUsersSuccess,
  props<{
    users: UserData[]
  }>(),
);

export const getUsersFailure = createAction(
  UserActions.GetUsersFailure,
  props<{
    error: string | null
  }>(),
);


export const getSortCriteria = createAction(
  SortActions.GetSortCriteria,
  props<{
    sortCriteria:Sort
  }
  >(),
);

export const getSortCriteriaSuccess = createAction(
  SortActions.GetSortCriteriaSuccess,
  props<{
    users: UserData[]
  }>(),
);

export const getSortCriteriaFailure = createAction(
  SortActions.GetSortCriteriaFailure,
  props<{
    error: string | null
  }>(),
);

