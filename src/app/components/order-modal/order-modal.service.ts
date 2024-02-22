import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root",
})
export class OrderModalService {
  constructor(private httpClient: HttpClient) {}

  public getOrderItemsList<T>(id: string): Observable<T> {
    return this.httpClient.get<T>(`http://localhost:3000/order/${id}`);
  }

  public patchOrder<T>(id: string, body: any): Observable<T> {
    return this.httpClient.patch<T>(`http://localhost:3000/order/${id}`, body);
  }
}
