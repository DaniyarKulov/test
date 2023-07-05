import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { SortUsersService } from '../../services/sort-users.service';
import { UsersFacadeService } from '../../services/users-facade.service';
import { UserData } from '../../models/user-data.model';
import { CollumnsName } from '../../models/collumnsName.type';

@Component({
  selector: 'agn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  public users!: MatTableDataSource<UserData>;
  public isVision = false;
  public columnsName: CollumnsName[] = [
    'name',
    'age',
    'picture',
    'company',
    'balance',
    'email',
    'address',
    'tags',
    'favorite_fruit',
    'isActive',
  ];
  public checkboxName: CollumnsName[] = [
    'name',
    'age',
    'picture',
    'company',
    'balance',
    'email',
    'address',
    'tags',
    'favorite_fruit',
  ];

  public isCheckedColumnsName = {
    name: false,
    age: false,
    picture: false,
    company: false,
    balance: false,
    email: false,
    address: false,
    tags: false,
    favorite_fruit: false,
    isActive: false,
  };
  public collumName = '';
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;
  private subs = new Subscription();

  constructor(
    private usersFacadeService: UsersFacadeService,
    private usersSortService: SortUsersService,
  ) {
  }

  public ngOnInit(): void {
    this.subs.add(this.usersSortService.sortedUsers$.pipe(
      tap((data) => {
        this.usersFacadeService.addUsers(data);
      }),
    ).subscribe((data) => {
      this.users = new MatTableDataSource(data);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    }));
  }


  public applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  public sortUsers(sortCriteria: Sort): void {
    this.usersSortService.sortUsers(sortCriteria);
  }

  public onVision(): void {
    this.isVision = !this.isVision;
  }

  public checked(columnName: CollumnsName): void {
    this.collumName = columnName;
    this.isCheckedColumnsName[columnName] = !this.isCheckedColumnsName[columnName];
  }
}

