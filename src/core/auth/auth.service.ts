import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
// TODO: Move all localStorage to a separate service

@Injectable()
export class AuthService {
  authorizeUrl: string = environment.amadeusApi.authorizeUrl;
  private onAuthenticated = new Subject<boolean>();
  public onAuthenticated$ = this.onAuthenticated.asObservable();
  constructor(public http: HttpClient) { }

  public isAuthenticated(): boolean {
    return !!this.getToken() && !this.isTokenExpired();
  }

  private isTokenExpired() {
    const token_expires_in = this.getExpiresIn();
    if (!token_expires_in) {
      return true;
    }
    const now = Date.now();
    return now >= token_expires_in;
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  private setToken(token: string) {
    return localStorage.setItem('access_token', token);
  }

  getExpiresIn(): number | null {
    const expiresInMs = localStorage.getItem('token_expires_in');
    if (!expiresInMs || !Number(expiresInMs)) {
      return null;
    }
    return +expiresInMs;
  }

  private setExpiresIn(expiresInMs: number) {
    return localStorage.setItem('token_expires_in', '' + expiresInMs);
  }

  public authenticate() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    };

    const bodyFormData = "grant_type=client_credentials&client_id=YzxROXyTmDsFvZ6YopyExVVBHG44pZ4X&client_secret=j802nEhIAVqlKPb9"

    return this.http.post(this.authorizeUrl, bodyFormData, httpOptions).pipe(tap((resp: any) => {
      if (resp && resp.access_token) {
        this.setToken(resp.access_token);
        const expiresInMs = Date.now() + resp.expires_in * 1000;
        this.setExpiresIn(expiresInMs);
        this.onAuthenticated.next(true);
      }
    }))
  }
}
