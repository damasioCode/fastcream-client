import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  public getDashboardKPI<T>(): Observable<T> {
    return this.httpClient.get<T>("http://localhost:3000/kpi");
  }
}
