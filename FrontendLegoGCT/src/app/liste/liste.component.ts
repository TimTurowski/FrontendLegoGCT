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
  movie: any = [];
  selectedMovie = null;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}
<<<<<<< HEAD
  
  //ngOnInit() {
  //  const mrToken = this.cookieService.get('mr-token');
  //  if(!mrToken) {
  //    this.router.navigate(['auth']);
  //  } else {
  //    this.router.navigate(['liste']);
  //  }
  //}
=======
>>>>>>> bac10625d886d68ce8145f86166ce3c61c8efdc4

  ngOnInit() {
  this.apiService.getMovies().subscribe(
    data => {
      this.movie = data;
    },
    (err) => {
      console.log(err)
    }
<<<<<<< HEAD
  )};
=======

    this.apiService.getMovies().subscribe(
      data => {
        this.movies = data;
      },
      (err) => {
        console.log(err)
      }
    );
  }
>>>>>>> bac10625d886d68ce8145f86166ce3c61c8efdc4

  logout(){
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth/']);
  }

  selectMovie(movie: null) {
    this.selectedMovie = movie;
    console.log('selectedMovie', this.selectedMovie);
  }
}
