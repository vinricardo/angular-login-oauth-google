import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  endpoints = {
    google: () => 'https://accounts.google.com/o/oauth2/v2/auth',
    me: () => 'https://www.googleapis.com/userinfo/v2/me',
  };
  private constants = {
    clientId: () =>
      '225879643106-5h9dbg024v3jur8d945vlvu80gab584u.apps.googleusercontent.com',
    responseType: () => 'token',
    scope: () => 'profile email',
    redirectUri: () => 'http://localhost:4200',
  };
  isAuthenticated!: boolean;
  constructor(private http: HttpClient, private router: Router) {}

  signInWithGoogle(): void {
    window.location.href = `${this.endpoints.google()}?client_id=${this.constants.clientId()}&response_type=${this.constants.responseType()}&scope=${this.constants.scope()}&redirect_uri=${this.constants.redirectUri()}`;
  }

  verifyAccessToken() {
    let accessToken = this.router.url.slice(
      this.router.url.indexOf('=') + 1,
      this.router.url.indexOf('&')
    );
    if (this.router.url.indexOf('=') > 0) {
      sessionStorage.setItem('access_token', accessToken);
      this.isAuthenticated = true;
    }
  }

  getPersonalInfo() {
    return this.http.get(`${this.endpoints.me()}`, {
      params: {
        access_token: sessionStorage.getItem('access_token') as string,
      },
    });
  }
}
