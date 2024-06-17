import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Login } from '../models/job.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://melisaebanks-001-site1.htempurl.com/api';

  private isAuthenticated = false;

  constructor(private router: Router, private http: HttpClient) { }

  login(username: string, password: string): boolean {
    let auth : Login =  {
      username : username,
      password : password
    }

    this.http.post(`${this.apiUrl}/login`, auth).subscribe(result => {
      if (result) {
        this.isAuthenticated = true;
      this.router.navigate(['/admin']);
      return true;
      } else {
        this.isAuthenticated = false;
        return false;
      }
    });
    return false;
  }


  logout(): void {
    this.isAuthenticated = false;
    this.router.navigate(['/']);
  }

  getAuthStatus(): boolean {
    return this.isAuthenticated;
  }
}
