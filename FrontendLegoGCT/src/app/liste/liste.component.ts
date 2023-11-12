import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})

export class ListeComponent implements OnInit{
  
  movies = [];
  selectedMovie = null;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}
  
  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');
    if(!mrToken) {
      this.router.navigate(['auth']);
    } else {
      this.router.navigate(['liste']);
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
