import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import {SucheComponent} from "../suche/suche.component";
import {LegoSet, Shop} from "../suche/datenstrukturen";
import {HttpClient} from "@angular/common/http";

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
    private suche: SucheComponent,
    private httpClient: HttpClient,

    ) {}


  async ngOnInit() {
    await this.httpClient.get("./assets/config.json").toPromise().then(data=>{
        this.apiService.apiUrl = JSON.parse(JSON.stringify(data)).config.DjangoURL;
      }
    );
    const mrToken = this.cookieService.get('mr-token');

    if(!mrToken) {
      //Nutzer ist nicht eingeloggt weiterleitung zum Login
      this.router.navigate(['login']);
    } else {
      //Nutzer ist eingeloggt weiterleitung zur Liste
      this.router.navigate(['liste']);
    }

    this.updateHistory();

  }
  /**
   * Updatet den Suchverlauf
   */
  updateHistory() {

      this.apiService.getSetHistory().subscribe(
          data => {
              console.log(JSON.stringify(data))
              this.legoSets = JSON.parse(JSON.stringify(data));
          },
          (err) => {
              console.log(err)
          }
      );
  }

  /**
   * auswählen eines Sets aus dem Suchverlauf
   * @param set ausgewählte Set
   */

  selectLegoSet(set: null) {
      this.selectedLegoSet = set;
      // @ts-ignore
      this.selectedLegoSetDetails = this.suche.getShops();
      // @ts-ignore
      console.log(this.selectedLegoSetDetails);
  }



  /**
   * Methode zum Löschen eines Sets aus dem Verlauf
   * @param set
   */
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
