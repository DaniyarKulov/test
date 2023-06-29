import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Features } from './enums/features';
import { UsersState } from './models/users-state.model';

const selectUsersFeature = createFeatureSelector<UsersState>(Features.Users);
export const selectUsers = createSelector(selectUsersFeature, ({ users }) => users);
export const selectLoading = createSelector(selectUsersFeature, ({ isLoading }) => isLoading);
