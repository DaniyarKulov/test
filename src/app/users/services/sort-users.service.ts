import { Injectable } from '@angular/core';
import { Sort } from '@angular/material/sort';
import {
  BehaviorSubject,
  combineLatest,
  map,
} from 'rxjs';
import { UsersHttpService } from './users-http.service';
import { sortMap } from '../utils/sort-map.const';

@Injectable({
  providedIn: 'root',
})
export class SortUsersService {
  private sort$$ = new BehaviorSubject<Sort | null>(null);
  public sort$ = this.sort$$.asObservable();
  public users$ = this.usersHttpService.users;
  public sortedUsers$ = combineLatest([this.users$, this.sort$]).pipe(
    map(([users, sort]) => (sort
      ? [...users].sort(
        (a, b) => (sortMap[sort.active](a, b)) * (sort.direction === 'asc' ? 1 : -1),
      )
      : users)),
  );

  constructor(private usersHttpService:UsersHttpService) {}

  public sortUsers(sortCriteria:Sort):void {
    this.sort$$.next(sortCriteria);
  }
}
