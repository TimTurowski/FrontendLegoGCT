import { Component,OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Token } from '@angular/compiler';
import { Router } from '@angular/router';

interface tokenObj {
  token: string; 
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerMode = false;

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router
  ) {}

  ngOnInit(){
    const mrToken = this.cookieService.get('mr-token');
    if(mrToken) {
      this.router.navigate(['/movies/']);
    }
  }

  saveForm() {
    if (!this.registerMode) {
      this.loginUser();
    } else {
      this.apiService.registerUser(this.authForm.value).subscribe(
        result => {
          this.loginUser();
        },
        error => console.log(error)
      );
    }
  }
  loginUser() {
    this.apiService.loginUser(this.authForm.value).subscribe(
      (result: Object) => { 
        const tokenResult = result as tokenObj; 
        this.cookieService.set("mr-token", tokenResult.token);
        this.router.navigate(['/liste']);
      },
      error => console.log(error)
    );
  }
}