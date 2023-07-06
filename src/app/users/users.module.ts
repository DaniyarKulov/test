import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ReactiveFormsModule } from '@angular/forms';
import { TableComponent } from './components/table/table.component';
import { MaterialModule } from '../shared/material/material.module';
import { Features } from './users-store/constants/features';
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
    ReactiveFormsModule,
    StoreModule.forFeature(Features.Users, usersReducer),
    EffectsModule.forFeature([UsersEffects]),
  ],
  exports: [UsersComponent],
})
export class UsersModule {
}
