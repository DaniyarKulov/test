import {
  ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild,
} from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { UsersFacadeService } from '../../services/users-facade.service';
import { UsersHttpService } from '../../services/users-http.service';
import { UserData } from '../../models/user-data.model';


@Component({
  selector: 'agn-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, OnDestroy {
  public users!: MatTableDataSource<UserData>;
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
  public isLoadingResults = true;
  public isLoading$ = this.usersFacadeService.isLoading$;
  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;
  private subs = new Subscription();

  constructor(private usersHttpService: UsersHttpService, private usersFacadeService: UsersFacadeService) {
  }

  public ngOnInit(): void {
    this.subs.add(this.usersHttpService.users.pipe(
      tap((data) => this.usersFacadeService.addUsers(data)),
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
}

