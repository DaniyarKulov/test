import {
  ChangeDetectionStrategy, Component, OnInit, ViewChild,
} from '@angular/core';
import { tap } from 'rxjs';
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
export class TableComponent implements OnInit {
  public users!: MatTableDataSource<UserData>;

  public displayedColumns: string[] = [
    'name',
    'age',
    'company',
    'balance',
    'email',
    'address',
    'tags',
    'favorite_fruit',
    'isActive',
  ];

  @ViewChild(MatPaginator) public paginator!: MatPaginator;
  @ViewChild(MatSort) public sort!: MatSort;

  constructor(private usersHttpService: UsersHttpService, private usersFacadeService:UsersFacadeService) {
  }
  public ngOnInit(): void {
    this.usersHttpService.users.pipe(
      tap((data) => this.usersFacadeService.addUsers(data)),
    ).subscribe((data) => {
      this.users = new MatTableDataSource(data);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
  }


  public applyFilter(event: Event):void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }
}

