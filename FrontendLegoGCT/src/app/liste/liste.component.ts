import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {SucheComponent} from "../suche/suche.component";
import {LegoSet, Shop} from "../suche/datenstrukturen";

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})

export class ListeComponent implements OnInit{
  legoSets = [];
  selectedLegoSet = null;
  selectedLegoSetDetails:Shop[] =  [];

    constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
    private suche: SucheComponent
  ) {}

  ngOnInit() {
    const mrToken = this.cookieService.get('mr-token');

    if(!mrToken) {
      this.router.navigate(['login']);
    } else {
      this.router.navigate(['liste']);
    }

    this.updateHistory();

  }
  updateHistory() {
      this.apiService.getSetHistory().subscribe(
          data => {

              this.legoSets = JSON.parse(JSON.stringify(data));
          },
          (err) => {
              console.log(err)
          }
      );
  }

  logout(){
    this.cookieService.delete('mr-token');
    this.router.navigate(['/auth/']);
  }

  selectLegoSet(set: null) {
      this.selectedLegoSet = set;
      // @ts-ignore
      this.suche.clickSuggestion(set["set_id"].concat('t'));

      this.selectedLegoSetDetails = this.suche.getShops();
      // @ts-ignore
      console.log(this.selectedLegoSetDetails);
  }


  deleteSet(set: any) {
    this.apiService.deleteSet(set.such_id).subscribe(
      data => {
          this.updateHistory();

          console.log(data)
      },
      (err) => {
        console.log(err)
      }
    )};
}
