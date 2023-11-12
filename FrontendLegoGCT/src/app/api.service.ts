import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  baseUrl = 'http://127.0.0.1:8000/';
  baseMovieUrl = `${this.baseUrl}api/movies/`;
  token = this.cookieService.get('mr-token');

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });
  
  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService
  ) {}

  getMovies() {
    return this.httpClient.get<any>(this.baseMovieUrl, {headers: this.getAuthHeaders()})
  }

  loginUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}auth/`, body, {headers: this.headers});
  }

  registerUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.baseUrl}api/users/`, body, {headers: this.headers});
  }

  getAuthHeaders(){
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Token ${token}'
    });
  }
}
