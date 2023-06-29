import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from '../shared/material/material.module';
import { Features } from './users-store/enums/features';
import { UsersComponent } from './users.component';
import { UsersEffects } from './users-store/users.effects';
import { usersReducer } from './users-store/users.reducer';

@NgModule({
  declarations: [
    TableComponent,
    UsersComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    NgOptimizedImage,
    StoreModule.forFeature(Features.Users, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
    MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule,
  ],
  exports: [UsersComponent],
})
export class UsersModule {}
