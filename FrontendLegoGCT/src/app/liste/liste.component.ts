import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})

export class ListeComponent implements OnInit{

  movies = [];
  selectedMovie = null;

  constructor(
      private http: HttpClient,
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if(!mrToken) {
      this.router.navigate(['auth']);
    } else {
      const mrToken = this.cookieService.get('mr-token');

      const cookieValue = 'mr-token='+ mrToken;

      const headers = new HttpHeaders({
        // 'Cookie': cookieValue,
        // "Access-Control-Allow-Origin": "*",
        // "Access-Control-Allow-Credentials": "true",
        // "Access-Control-Allow-Methods": "GET",
        // "Access-Control-Allow-Headers": "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers",
        "withCredentials": "true",
      });

      this.http.get("http://localhost:8000/verlauf", {headers}).subscribe(data=>{
      console.log(data);});

      // this.router.navigate(['liste']);
    }
  }


  logout(){
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth/']);
  }

  selectMovie(movie: null) {
    this.selectedMovie = movie;
    console.log('selectedMovie', this.selectedMovie);
  }
}
