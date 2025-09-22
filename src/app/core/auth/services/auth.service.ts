import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  #http = inject(HttpClient);
  #router = inject(Router);

  // signals for reactive state
  token = signal<string | null>(localStorage.getItem('token'));
  isLoggedIn = computed(() => !!this.token());

  private apiUrl = 'http://localhost:8000/api/auth';

  login(username: string, password: string) {
    const body = new URLSearchParams();
    body.set('username', username);
    body.set('password', password);

    return this.#http
      .post<{ access_token: string; token_type: string }>(`${this.apiUrl}/login`, body.toString(), {
        headers: new HttpHeaders({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
      })
      .pipe(
        tap((res) => {
          this.token.set(res.access_token);
          localStorage.setItem('token', res.access_token);
        })
      );
  }

  signup(name: string, email: string, password: string) {
    return this.#http.post(`${this.apiUrl}/signup`, null, {
      params: { name, email, password },
    });
  }

  logout() {
    this.token.set(null);
    localStorage.removeItem('token');
    this.#router.navigate(['/login']);
  }
}
