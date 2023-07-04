import { HttpClient } from '@angular/common/http';
import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, catchError, map, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthStatus, LoginResponse, User } from '../interfaces';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class RegisterServiceService {
  private readonly baseUrl: string = environment.baseUrl;

  private http = inject(HttpClient);

  private authService = inject(AuthService);

  register(email: string, password: string, name: string): Observable<boolean> {
    const url = `${this.baseUrl}/auth/register`;
    const body = {
      email: email,
      password: password,
      name: name,
    };

    return this.http.post<LoginResponse>(url, body).pipe(
      map(({ user, token }) => this.authService.setAuthentication(user, token)),
      catchError((err) => throwError(() => err.error.message))
    );
  }

  constructor() {
    this.authService.checkAuthStatus().subscribe();
  }
}
