import {Injectable, OnInit} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import {AppComponent} from "./app.component";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnInit{

  movies = ['Terminator', 'dasmas'];

  // http://192.168.198.47:8000  http://127.0.0.1:8000/
  apiUrl = 'http://127.0.0.1:8000';
  baseMovieUrl = `${this.apiUrl}verlauf`;
  token = this.cookieService.get('mr-token');
//__________
  baseBaseUrl = 'http://127sd.0.0.1:8000';
  headersTest = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'Token 5e2dc086cb321b176bcb168c326de0aef7cf38d3'
  });
//__________

  headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  constructor(
    private httpClient: HttpClient,
    private cookieService: CookieService,
  ) {}
  ngOnInit() {

  }

  /**
   * Methode um die Legoset Historie des Nutzers zu holen.
   */
  getSetHistory(){
    console.log(this.apiUrl);
    // return this.httpClient.get<any>("https://raw.githubusercontent.com/TimSibum/LegoGCTDeployments/main/verlauf.json");
    return this.httpClient.get<any>(this.apiUrl + "/verlauf/", {headers: this.getAuthHeaders()})
  }

  /**
   *
   * @param authData
   */
  loginUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.apiUrl}/auth/`, body, {headers: this.headers});
  }

  registerUser(authData: any) {
    const body = JSON.stringify(authData);
    return this.httpClient.post(`${this.apiUrl}/register/`, body, {headers: this.headers});
  }


  getAuthHeaders(){
    const token = this.cookieService.get('mr-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token
    });
  }

  deleteSet(id: number){
    return this.httpClient.get(this.apiUrl +"/delete/?id=" + id, {headers: this.headersTest});
  }
}
