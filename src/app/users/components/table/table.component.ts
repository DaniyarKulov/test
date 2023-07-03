import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { SortUsersService } from '../../services/sort-users.service';
import { UsersFacadeService } from '../../services/users-facade.service';
import { UserData } from '../../models/user-data.model';
import { localeStringComporator } from '../../utils/locale-string-comporator.const';

@Component({
  selector: 'agn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  public users!: MatTableDataSource<UserData>;
  public isVision = false;
  public currentIndex: number | null = null;
  public indexes:number[] = [];
  public displayedColumns = [
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
  public displayedCheckbox = [
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
  public collumName = '';
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;
  private subs = new Subscription();

  constructor(
    private usersFacadeService: UsersFacadeService,
    private usersSortService:SortUsersService,
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
      this.indexes = Array.from({ length: data.length }, (_, index) => index);
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

  public sortUsers(sortCriteria: Sort):void {
    this.usersSortService.sortUsers(sortCriteria);
  }

  // public onVision(index:number):void {
  //   this.currentIndex = index;
  //   const currentIndex = this.indexes.indexOf(index);
  //   if (currentIndex > -1) {
  //     this.indexes.splice(currentIndex, 1);
  //   } else {
  //     this.indexes.push(index);
  //   }
  //   this.isVision = !this.isVision;
  // }

  public onVision():void {
    this.isVision = !this.isVision;
  }

  public checked(columnName: string): void {
    this.collumName = columnName;
  }

  public localComparator(string:string):boolean {
    return !!localeStringComporator(this.collumName, string);
  }
}

