import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  public getUsersList<T>(): Observable<T> {
    return this.httpClient.get<T>('http://localhost:3000/user');  
  }
  
  public getUserByID<T>(id: string): Observable<T> {
    return this.httpClient.get<T>(`http://localhost:3000/user/${id}`);  
  }
}
