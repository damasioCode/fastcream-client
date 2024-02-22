import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface TokenLogin {
  email: string;
  password: string;
}

@Injectable({
  providedIn: "root",
})
export class LoginService {
  constructor(private httpClient: HttpClient) {}

  public postTokenLogin<T>(body: TokenLogin): Observable<T> {
    return this.httpClient.post<T>("http://localhost:3000/auth/login", body);
  }

  public getTokenLogin(): string {
     if (typeof window !== 'undefined' && localStorage.getItem('token')) {
      return localStorage.getItem("token") as string;
     } else {
       return ''    
    }
  }

  public setTokenLogin(response: { access_token: string }): void {
    localStorage.setItem("token", response.access_token);
  }

  public removeTokenLogin(): void {
    localStorage.removeItem("token");
  }
}
