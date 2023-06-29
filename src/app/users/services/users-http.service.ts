import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environment/environment';
import { UserData } from '../models/user-data.model';

@Injectable({
  providedIn: 'root',
})
export class UsersHttpService {
  constructor(private httpClient: HttpClient) { }

  public get users():Observable<UserData[]> {
    return this.httpClient.get<UserData[]>(environment.API_PATH);
  }
}
